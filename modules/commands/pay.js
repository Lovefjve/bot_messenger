module.exports.config = {
    name: "pay",
    version: "1.1.1",
    hasPermssion: 0,
    credits: "Mirai Team mod cực mạnh by kiraUwU",
    description: "Chuyển tiền của bản thân cho ai đó",
    commandCategory: "User",
    usages: "pay [ reply ]",
    cooldowns: 5,
};

module.exports.run = async function ({ api, args, event, Currencies, Users }) {
    let { threadID, messageID, senderID } = event;
    var info = await api.getUserInfo(event.senderID);
    var userName = info[event.senderID].name;
    const axios = require('axios');
    const moment = require("moment-timezone");
    var time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm");
    var day = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
    var content = args.slice(1).join(" ");
    var codeGD = String(Math.floor(Math.random() * (90000000000 - 1)) + 10000000000);
    
    if (event.type == "message_reply") {
        mention = event.messageReply.senderID;
        var name = (await Users.getData(mention)).name;
        if (!isNaN(args[0])) {
            const amount = parseInt(args[0]);
            let balance = (await Currencies.getData(senderID)).money;
            if (amount <= 0) return api.sendMessage('[𝐌𝐎𝐌𝐎] - Số tiền không hợp lệ 😼', threadID, messageID);
            if (amount > balance) return api.sendMessage('[𝐌𝐎𝐌𝐎] - Số tiền bạn muốn chuyển lớn hơn số tiền bạn hiện có 💳', threadID, messageID);
            else {
                return api.sendMessage(`[𝐌𝐎𝐌𝐎] - Vui lòng chờ bot xử lý giao dịch 💸`, event.threadID, async (err, info) => {
                    await new Promise(resolve => setTimeout(resolve, 5 * 1000));
                    await Currencies.increaseMoney(mention, parseInt(amount));
                    Currencies.decreaseMoney(senderID, parseInt(amount));
                    api.unsendMessage(info.messageID);
                    var msg = `[𝐌𝐎𝐌𝐎] - Giao dịch thành công\n` +
                              `Người gửi: ${userName}\n` +
                              `Người nhận: ${name}\n` +
                              `Số tiền: -${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ\n` +
                              `Nội dung: ${content}\n` +
                              `Mã giao dịch: ${codeGD}\n` +
                              `Thời gian: ${time} - ${day}\n` +
                              `Ví MoMo`;

                    return api.sendMessage(msg, threadID, messageID);
                });
            }
        } else return api.sendMessage('[𝐌𝐎𝐌𝐎] - Vui lòng nhập số coins muốn chuyển 💳', threadID, messageID);
    }
}
