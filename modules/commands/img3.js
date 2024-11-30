const fs = require('fs-extra');
const axios = require('axios');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports.config = {
    name: "img3",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Lovefjve",
    description: "Random IMG vip",
    commandCategory: "Random-IMG",
    usages: "img3 hoặc img3 <tên category>",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "uuid": ""
    }
};

module.exports.run = async ({ api, event, args, Currencies }) => {
    const imgDir = path.resolve(__dirname, '../../src-api/img');
    const cost = 700; // Chi phí để sử dụng lệnh

    // Lấy thông tin tiền của người dùng
    const userData = await Currencies.getData(event.senderID);
    const userMoney = userData.money;

    if (args.length === 0) {
        // Hiển thị danh sách các category
        const files = fs.readdirSync(imgDir);
        const categories = files.map(file => file.replace('.json', ''));
        const formattedCategories = categories.map(cat => `  ${cat}: random ảnh ${cat}`).join('\n');
        return api.sendMessage(`=== 『 Danh sách API ảnh 』 ===\n\n${formattedCategories}\n\nHướng dẫn sử dụng 𝒊𝒎𝒈3 <𝒕𝒆̂𝒏_𝒂𝒑𝒊>`, event.threadID, event.messageID);
    } else {
        const category = args[0];
        const filePath = path.join(imgDir, `${category}.json`);

        if (!fs.existsSync(filePath)) {
            return api.sendMessage(`→ Không tìm thấy category: ${category}`, event.threadID, event.messageID);
        }

        if (userMoney < cost) {
            return api.sendMessage(`→ Bạn cần ${cost}$ để xem ảnh.`, event.threadID, event.messageID);
        }

        const imgData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const imgList = imgData;

        if (imgList.length < 3) {
            return api.sendMessage(`→ Không đủ ảnh trong category: ${category} để chọn 3 ảnh.`, event.threadID, event.messageID);
        }

        // Chọn ngẫu nhiên 3 URL từ danh sách
        const randomIndices = [];
        while (randomIndices.length < 3) {
            const randomIndex = Math.floor(Math.random() * imgList.length);
            if (!randomIndices.includes(randomIndex)) {
                randomIndices.push(randomIndex);
            }
        }

        const imgURLs = randomIndices.map(index => imgList[index]);

        // Tải và gửi từng ảnh
        const downloadPromises = imgURLs.map(async (imgURL) => {
            const tempFileName = `${uuidv4()}.jpg`;
            const tempFilePath = path.join(__dirname, 'cache', tempFileName);

            // Retry logic with exponential backoff
            const maxRetries = 3;
            const timeout = 10000; // 10 seconds
            for (let attempt = 1; attempt <= maxRetries; attempt++) {
                try {
                    const response = await axios.get(imgURL, { responseType: 'stream', timeout: timeout });
                    await new Promise((resolve, reject) => {
                        const stream = fs.createWriteStream(tempFilePath);
                        response.data.pipe(stream);
                        stream.on('finish', () => resolve(tempFilePath));
                        stream.on('error', reject);
                    });
                    return tempFilePath;
                } catch (error) {
                    if (attempt < maxRetries) {
                        console.log(`Attempt ${attempt} failed. Retrying...`);
                        await new Promise(resolve => setTimeout(resolve, attempt * 1000)); // Exponential backoff
                    } else {
                        throw error;
                    }
                }
            }
        });

        try {
            const attachments = await Promise.all(downloadPromises);

            // Giảm tiền của người dùng sau khi tải xong tất cả ảnh
            await Currencies.decreaseMoney(event.senderID, cost);

            api.sendMessage({
                body: `  === 『 ${category.toUpperCase()} 』 ===\n━━━━━━━━━━━━━━\n\n→ Ảnh ${category} nè💞\n→ Số lượng: ${imgList.length} ảnh.\n→ -${cost}$\nlink: ${imgURLs.join('\n ')}`,
                attachment: attachments.map(filePath => fs.createReadStream(filePath))
            }, event.threadID, (err, info) => {
                if (err) return console.error(err);
                // Thu hồi tin nhắn sau 50 giây
                setTimeout(() => api.unsendMessage(info.messageID), 50000);
                // Xóa ảnh sau khi gửi tin nhắn
                attachments.forEach(filePath => fs.unlinkSync(filePath));
            });
        } catch (error) {
            console.error(error);
            api.sendMessage(`→ Lỗi khi tải ảnh`, event.threadID, event.messageID);
        }
    }
};
