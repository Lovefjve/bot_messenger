const fs = require('fs-extra');
const axios = require('axios');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports.config = {
    name: "vd",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Lovefjve",
    description: "Random video từ API",
    commandCategory: "Random-VIDEO",
    usages: "video hoặc video <tên category>",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "uuid": ""
    }
};

const cacheDir = path.resolve(__dirname, 'cache');
if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir);
}

module.exports.run = async ({ api, event, args, Currencies }) => {
    const videoDir = path.resolve(__dirname, '../../src-api/video');
    const cost = 400; // Chi phí để sử dụng lệnh

    // Lấy thông tin tiền của người dùng
    const userData = await Currencies.getData(event.senderID);
    const userMoney = userData.money;

    if (args.length === 0) {
        // Hiển thị danh sách các category
        const files = fs.readdirSync(videoDir);
        const categories = files.map(file => file.replace('.json', ''));
        const formattedCategories = categories.map(cat => `  ${cat}: random video ${cat}`).join('\n');
        return api.sendMessage(`=== 『 Danh sách API video 』 ===\n\n${formattedCategories}\n\nHướng dẫn sử dụng 𝒗𝒅 <𝒕𝒆̂𝒏_𝒄𝒂𝒕𝒆𝒈𝒐𝒓𝒚>`, event.threadID, event.messageID);
    } else {
        const category = args[0];
        const filePath = path.join(videoDir, `${category}.json`);

        if (!fs.existsSync(filePath)) {
            return api.sendMessage(`→ Không tìm thấy category: ${category}`, event.threadID, event.messageID);
        }

        if (userMoney < cost) {
            return api.sendMessage(`→ Bạn cần ${cost}$ để xem video.`, event.threadID, event.messageID);
        }

        const videoData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const videoList = videoData;
        const randomIndex = Math.floor(Math.random() * videoList.length);
        const videoURL = videoList[randomIndex];

        const tempFileName = `${uuidv4()}.mp4`;
        const tempFilePath = path.join(cacheDir, tempFileName);

        const callback = () => {
            api.sendMessage({
                body: `  === 『 ${category.toUpperCase()} 』 ===\n━━━━━━━━━━━━━━\n\n→ Video ${category} nè💞\n→ Số lượng: ${videoList.length} video.\n→ -${cost}$\nlink: ${videoURL}`,
                attachment: fs.createReadStream(tempFilePath)
            }, event.threadID, (err, info) => {
                if (err) return console.error(err);
                // Thu hồi tin nhắn sau 50 giây
                setTimeout(() => api.unsendMessage(info.messageID), 70000);
                // Xóa video sau khi gửi tin nhắn
                fs.unlinkSync(tempFilePath);
            });
        };

        try {
            const response = await axios.get(videoURL, { responseType: 'stream' });
            const writer = fs.createWriteStream(tempFilePath);
            response.data.pipe(writer);

            writer.on('finish', async () => {
                await Currencies.decreaseMoney(event.senderID, cost);
                callback();
            });

            writer.on('error', err => {
                console.error(err);
                api.sendMessage(`→ Lỗi khi tải video`, event.threadID, event.messageID);
            });
        } catch (error) {
            console.error(error);
            api.sendMessage(`→ Lỗi khi tải video`, event.threadID, event.messageID);
        }
    }
};
