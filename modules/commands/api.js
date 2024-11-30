module.exports.config = {
    name: "api",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Lovefjve",
    description: "Lấy ảnh hoặc video từ các API khác nhau",
    commandCategory: "Random-IMG",
    usages: "api",
    cooldowns: 1,
};

const axios = require('axios');
const request = require('request');
const fs = require("fs");
const path = require("path");

const apiUrls = {
    "gái": "https://api.sumiproject.net/images/girl",
    "sexy": "https://api.sumiproject.net/video/girlsexy",
    "6mui": "https://api.sumiproject.net/video/6mui",
    "trai": "https://api.sumiproject.net/images/trai",
    "anime": "https://api.sumiproject.net/images/anime",
    "vú": "https://api.sumiproject.net/images/du",
    "nude": "https://api.sumiproject.net/images/nude",
    "vdsex": "https://api.sumiproject.net/video/videosex",
    "vdgai": "https://api.sumiproject.net/video/videogai",
    "vdanime": "https://api.sumiproject.net/video/videoanime"
};
const apiDescriptions = {
    "gái": "Ảnh gái xinh" ,
    "sexy": "Ảnh gái sexy" ,
    "6mui": "Ảnh 6 múi" ,
    "trai": "Ảnh trai đẹp", 
    "anime": "Ảnh anime" ,
    "vú": "Ảnh vú" ,
    "nude": "Ảnh nude" ,
    "vdsex": "Video sex" ,
    "vdgai": "Video gái" ,
    "vdanime": "Video anime" 
   
};

const getCount = async (url) => {
    try {
        const response = await axios.get(url, { timeout: 10000 });
        return response.data.count || 0;
    } catch (error) {
        console.error(error);
        return 0;
    }
};

module.exports.run = async ({ api, event, args, Currencies }) => {
    const command = args[0];
    if (command === 'list') {
        let apiList = "  ========[ API LIST ]========\n\n";
        Object.keys(apiUrls).forEach((key, index) => {
            apiList += `${index + 1}. ${key}:`;
            if (key in apiDescriptions) {
                apiList += ` ${apiDescriptions[key]}\n`;
            } else {
                apiList += " (Chú thích nếu có)\n";
            }
        });
        apiList += "\nHướng dẫn sử dụng 𝒂𝒑𝒊 <𝒕𝒆̂𝒏_𝒂𝒑𝒊>";
        api.sendMessage(apiList, event.threadID, async (error, info) => {
            if (info && info.messageID) {
                // Thiết lập hẹn giờ để thu hồi tin nhắn sau 30 giây
                setTimeout(() => {
                    api.unsendMessage(info.messageID);
                }, 40000);
            }
        });
        return;
    }

    if (!command) {
        return api.sendMessage(" ◆━━━━━[ API ]━━━━━◆ \n\n1: Ảnh\n2: Video\n3: 18+\n\nHãy reply với số thứ tự để chọn.\n𝒂𝒑𝒊 𝒍𝒊𝒔𝒕 để xem tất cả api", event.threadID, (error, info) => {
            if (info && info.messageID) {
                global.client.handleReply.push({
                    type: "category",
                    name: this.config.name,
                    author: event.senderID,
                    messageID: info.messageID
                });
                setTimeout(() => api.unsendMessage(info.messageID), 50000);
            }
        });
    }

    if (!apiUrls[command]) {
        return api.sendMessage("Lệnh không hợp lệ. Hãy dùng 𝒂𝒑𝒊 <𝒕𝒆̂𝒏 𝒍𝒆̣̂𝒏𝒉> để thực hiện.", event.threadID, event.messageID);
    }

    const data = await Currencies.getData(event.senderID);
    const money = data.money;

    if (money < 100) {
        return api.sendMessage("Bạn cần 100$ để xem ảnh/video.", event.threadID, event.messageID);
    }

    await Currencies.setData(event.senderID, { money: money - 100 });

    axios.get(apiUrls[command], { timeout: 10000 }).then(async res => {
        const ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
        const filePath = path.join(__dirname, `cache/file.${ext}`);
        const count = await getCount(apiUrls[command]);

        let callback = function () {
            api.sendMessage({
                body: `Api của bạn nè 🤤 ❤️\nSố lượng: ${count}\n-100$`,
                attachment: fs.createReadStream(filePath)
            }, event.threadID, (error, info) => {
                if (info && info.messageID) {
                    setTimeout(() => {
                        api.unsendMessage(info.messageID);
                        if (fs.existsSync(filePath)) {
                            fs.unlinkSync(filePath);
                        }
                    }, 50000);
                }
            }, event.messageID);
        };
        request(res.data.url).pipe(fs.createWriteStream(filePath)).on("close", callback);
    }).catch(error => {
        console.error(error);
        api.sendMessage("Đã có lỗi xảy ra khi tải ảnh/video.", event.threadID, event.messageID);
    });
};

module.exports.handleReply = async ({ api, event, handleReply, Currencies }) => {
    api.unsendMessage(event.messageID); // Xóa tin nhắn reply ngay khi nhận được

    const data = await Currencies.getData(event.senderID);
    const money = data.money;
    const choice = parseInt(event.body);

    if (handleReply.type === "category") {
        let category;
        if (choice === 1) {
            category = ["gái", "sexy", "6mui", "trai", "anime"];
        } else if (choice === 2) {
            category = ["vdgai", "vdanime"];
        } else if (choice === 3) {
            category = ["vú", "nude", "vdsex"];
        } else {
            return api.sendMessage("Lựa chọn không hợp lệ.", event.threadID, event.messageID);
        }

        const countPromises = category.map(item => getCount(apiUrls[item]));
        const counts = await Promise.all(countPromises);

        const message = category.map((item, index) => `${index + 1}: ${item}`).join("\n");

        api.unsendMessage(handleReply.messageID);

        return api.sendMessage(`Chọn lệnh:\n${message}\n\nHãy reply với số thứ tự để chọn hoặc dùng lệnh 𝒂𝒑𝒊 <𝒕𝒆̂𝒏_𝒂𝒑𝒊> để sử dụng`, event.threadID, (error, info) => {
            if (info && info.messageID) {
                global.client.handleReply.push({
                    type: "command",
                    name: this.config.name,
                    author: event.senderID,
                    category,
                    messageID: info.messageID
                });
                setTimeout(() => api.unsendMessage(info.messageID), 50000);
            }
        });
    } else if (handleReply.type === "command") {
        const index = parseInt(event.body) - 1;
        const command = handleReply.category[index];

        if (!command) {
            return api.sendMessage("Lựa chọn không hợp lệ.", event.threadID, event.messageID);
        }

        if (money < 100) {
            return api.sendMessage("Bạn cần 100$ để xem ảnh/video.", event.threadID, event.messageID);
        }

        await Currencies.setData(event.senderID, { money: money - 100 });

        axios.get(apiUrls[command], { timeout: 10000 }).then(async res => {
            const ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
            const filePath = path.join(__dirname, `cache/file.${ext}`);
            const count = await getCount(apiUrls[command]);

            let callback = function () {
                api.sendMessage({
                    body: `Api của bạn nè 🤤 ❤️\nSố lượng: ${count}\n-100$`,
                    attachment: fs.createReadStream(filePath)
                }, event.threadID, (error, info) => {
                    if (info && info.messageID) {
                        setTimeout(() => {
                            api.unsendMessage(info.messageID);
                            if (fs.existsSync(filePath)) {
                                fs.unlinkSync(filePath);
                            }
                        }, 50000);
                    }
                }, event.messageID);
            };
            request(res.data.url).pipe(fs.createWriteStream(filePath)).on("close", callback);
        }).catch(error => {
            console.error(error);
            api.sendMessage("Đã có lỗi xảy ra khi tải ảnh/video.", event.threadID, event.messageID);
        });
    }
};
