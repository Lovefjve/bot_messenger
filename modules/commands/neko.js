module.exports.config = {
    name: "nekko",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "JRT",
    description: "Ảnh",
    commandCategory: "Random-IMG",
    usages: "nekko",
    cooldowns: 1,
  };
  
  module.exports.run = async ({ api, event, Currencies }) => {
    const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
  
    var data = await Currencies.getData(event.senderID);
    var money = data.money;
  
    // Kiểm tra số tiền hiện tại của người dùng
    if (money < 100) {
      return api.sendMessage("→ Bạn cần 100 đô để xem ảnh ?", event.threadID, event.messageID);
    }
  
    // Trừ tiền của người dùng
    await Currencies.setData(event.senderID, { money: money - 100 });
  
    // Tiếp tục thực hiện yêu cầu API và gửi ảnh
    axios.get('https://nekos.life/api/v2/img/neko').then(res => {
      let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
  
      let callback = function () {
        api.sendMessage({
          body: "Anata no ecchi 🤤 ❤️\n-100$",
          attachment: fs.createReadStream(__dirname + `/cache/dog.${ext}`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/dog.${ext}`), event.messageID);
      };
      request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/dog.${ext}`)).on("close", callback);
    });
  };
  