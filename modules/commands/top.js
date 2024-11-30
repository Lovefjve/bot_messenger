module.exports.config = {
    name: "top",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "JRT",
    description: "Xem các cấp độ của người dùng",
    commandCategory: "Thống kê",
    usages: "[thread/user/money/level]",
    cooldowns: 5
};

module.exports.run = async ({ event, api, args, Currencies, Users }) => {
    const { threadID, messageID } = event;
    if (args[1] && (isNaN(args[1]) || parseInt(args[1]) <= 0)) {
        return api.sendMessage("[😽]➜ Thông tin độ dài list phải là một con số và không dưới 0", threadID, messageID);
    }
    const option = parseInt(args[1]) || 10;
    const fs = require("fs-extra");
    const request = require("request");

    function expToLevel(point) {
        if (point < 0) return 0;
        return Math.floor((Math.sqrt(1 + (4 * point) / 3) + 1) / 2);
    }

    if (args[0] == "level") {
        let all = await Currencies.getAll(['userID', 'exp']);
        all.sort((a, b) => b.exp - a.exp);
        let msg = {
            body: '=== Top 15 người dùng có level cao nhất server ===',
        };
        for (let i = 0; i < Math.min(15, all.length); i++) {
            let level = expToLevel(all[i].exp);
            let user = await Users.getData(all[i].userID);
            let name = user.name;
            msg.body += `\n${i + 1}. ${name} - cấp ${level}`;
        }
        return api.sendMessage(msg, threadID, messageID);
    }

    if (args[0] == "thread") {
        try {
            let data = await api.getThreadList(option + 10, null, ["INBOX"]);
            let threadList = data.filter(thread => thread.isGroup).map(thread => ({
                threadName: thread.name,
                threadID: thread.threadID,
                messageCount: thread.messageCount
            }));

            threadList.sort((a, b) => b.messageCount - a.messageCount);

            let msg = "";
            for (let i = 0; i < Math.min(option, threadList.length); i++) {
                let thread = threadList[i];
                msg += `${i + 1}. ${(thread.threadName) || "Không tên"}\n[💎]➜ TID: [${thread.threadID}]\n[🌸]➜ Số tin nhắn: ${thread.messageCount} tin nhắn\n\n`;
            }
            return api.sendMessage(`=== Dưới đây là top ${threadList.length} các nhóm lắm mồm nhất quả đất ===\n≻───── ⋆✩⋆ ─────≺\n${msg}\n≻────END────≺`, threadID, messageID);
        } catch (e) {
            console.log(e);
        }
    }

    if (args[0] == "money") {
        let all = await Currencies.getAll(['userID', 'money']);
        all.sort((a, b) => b.money - a.money);
        let msg = {
            body: '=== Top 10 người dùng giàu nhất server ===',
        };
        for (let i = 0; i < Math.min(10, all.length); i++) {
            let user = await Users.getData(all[i].userID);
            let name = user.name;
            msg.body += `\n${i + 1}. ${name}: ${all[i].money} đô`;
        }
        return api.sendMessage(msg, threadID, messageID);
    }

    if (args[0] == "user") {
        try {
            let data = await Currencies.getAll(["userID", "exp"]);
            data.sort((a, b) => b.exp - a.exp);
            const idBot = api.getCurrentUserID();
            data = data.filter(item => item.userID != idBot);

            let msg = "";
            for (let i = 0; i < Math.min(option, data.length); i++) {
                let user = await Users.getData(data[i].userID);
                let name = user.name;
                msg += `${i + 1}/ ${name} với ${data[i].exp} tin nhắn\n`;
            }
            return api.sendMessage(`=== Dưới đây là top ${option} các người dùng lắm mồm nhất quả đất ===\n\n${msg}`, threadID, messageID);
        } catch (e) {
            console.log(e);
        }
    }
};
