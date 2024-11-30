const fs = require("fs"),
  path = __dirname + '/../../includes/handle/usages.json';

module.exports.config = {
  name: "luotdung",
  version: "1.0",
  hasPermssion: 0,
  credits: "Lovefjve",
  description: "Xem lượt dùng bot của bản thân",
  commandCategory: "User",
  usages: "luotdung",
  cooldowns: 5,

};

module.exports.run = async function({ api, event }) {
    const {PREFIX, ADMINBOT, NDH, } = global.config;

    const { threadID, messageID, senderID } = event,
      data = JSON.parse(fs.readFileSync(path));
  
    if (data[senderID]) {
      const userUsages = data[senderID].usages || 0;
      if (ADMINBOT.includes(senderID)) {
        return api.sendMessage(`→ Bạn là BOSS nên thích dùng bao nhiêu cũng được.`, threadID, messageID);
      }else {
        return api.sendMessage(`→ Số lượt dùng của bạn: ${userUsages}`, threadID, messageID);
      }
      
    } else {
      return api.sendMessage(`→ Bạn chưa có dữ liệu!`, threadID, messageID);
    }
  };