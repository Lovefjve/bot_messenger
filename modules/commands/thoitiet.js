module.exports.config = {
    name: "thoitiet",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie convert từ Goat",
    description: "Xem thời tiết trong 5 ngày",
    commandCategory: "Tiện ích",
    usages: "[location]",
    cooldowns: 5
};
module.exports.run = async o => {
    try{
    const axios = global.nodemodule["axios"];
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const { api, event, args } = o;
    const { threadID, messageID } = event;
    var bok = args.join(" ");
    if(!bok) return api.sendMessage("nhập tỉnh/tp cần xem thời tiết", threadID);
    const res = await axios.get(`https://api.popcat.xyz/weather?q=${encodeURI(bok)}`);
    const bokk = res.data[0].forecast;
    var text = `Thời tiết của: ${bok} vào các ngày`;
    for (let i = 0; i < 5; i++) {
      text += `\n${i+1}-> ${bokk[i].day} ${bokk[i].date}\n=>Nhiệt độ dự báo: từ ${bokk[i].low} đến ${bokk[i].high}\n=>Mô tả: ${bokk[i].skytextday}\n=>Tỷ lệ mưa: ${bokk[i].precip}\n`
    };
    api.sendMessage(text, threadID, messageID)
    }catch(err){api.sendMessage(`${err}`, threadID)}
  }