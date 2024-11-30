const moment = require("moment-timezone");

module.exports.config = {
  name: "hi",
  version: "1.0.0",
  hasPermssion: 1,
  credit: "Sam",
  description: "Hi gửi sticker",
  commandCategory: "Trò chuyện",
  usages: "[text]",
  cooldowns: 5
};

module.exports.handleEvent = async ({ event, api, Users }) => {
  const KEY = [ 
    "hello", "hi", "hai", "chào", "hí", "híí", "hì", "hiii", "lô", "hii", "helo", "hê nhô", "hi mn"
  ];

  let thread = global.data.threadData.get(event.threadID) || {};
  if (typeof thread["hi"] === "undefined" || thread["hi"] === false) return;
  
  if (KEY.includes(event.body.toLowerCase())) {
    const data = [
      "2523892817885618", "2523892964552270", "2523893081218925", "2523893217885578",
      "2523893384552228", "2523892544552312", "2523892391218994", "2523891461219087",
      "2523891767885723", "2523891204552446", "2523890691219164", "2523890981219135",
      "2523890374552529", "2523889681219265", "2523889851219248", "2523890051219228",
      "2523886944552872", "2523887171219516", "2523888784552688", "2523888217886078",
      "2523888534552713", "2523887371219496", "2523887771219456", "2523887571219476"
    ];
    let sticker = data[Math.floor(Math.random() * data.length)];
    let hours = moment.tz('Asia/Ho_Chi_Minh').format('HHmm');
    const data2 = ["tốt lành", "vui vẻ"];
    let text = data2[Math.floor(Math.random() * data2.length)];
    let session = (
      hours > 0 && hours <= 400 ? "sáng tinh mơ" : 
      hours > 400 && hours <= 700 ? "sáng sớm" :
      hours > 700 && hours <= 1000 ? "sáng" :
      hours > 1000 && hours <= 1200 ? "trưa" : 
      hours > 1200 && hours <= 1700 ? "chiều" : 
      hours > 1700 && hours <= 1800 ? "chiều tà" : 
      hours > 1800 && hours <= 2100 ? "tối" : 
      hours > 2100 && hours <= 2400 ? "tối muộn" : 
      "lỗi"
    );

    let name = await Users.getNameUser(event.senderID);
    let mentions = [{ tag: name, id: event.senderID }];
    let msg = { body: `Xin chào ${name}, chúc bạn một buổi ${session} ${text} ❤️`, mentions };
    
    api.sendMessage(msg, event.threadID, (e, info) => {
      setTimeout(() => {
        api.sendMessage({ sticker: sticker }, event.threadID);
      }, 100);
    }, event.messageID);
  }
};

module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
    "successText": `${this.config.name} thành công`,
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "success!",
  }
};

module.exports.run = async ({ event, api, Threads, getText }) => {
  let { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
  
  data["hi"] = !data["hi"];
  
  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  
  return api.sendMessage(`${data["hi"] ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
};
