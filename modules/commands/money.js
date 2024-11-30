module.exports.config = {
  name: "money",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "Mirai Team",
  description: "Kiểm tra số tiền của bản thân hoặc người được tag",
  commandCategory: "User",
  usages: "[Tag]",
  cooldowns: 5
  };
  
  module.exports.languages = {
  "vi": {
  "sotienbanthan": "===== [ 𝗠𝗢𝗡𝗘𝗬 ] =====\n ◆━━━━━━━━━━━━━━━━◆\n [ 🐣  ] 𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐭𝐢𝐞̂̀𝐧 𝐛𝐚̣𝐧 𝐜𝐨́ 𝐭𝐫𝐨𝐧𝐠\n 𝐯𝐢́ 𝐡𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 𝐥𝐚̀: %1$",
  "sotiennguoikhac": "===== [ 𝗠𝗢𝗡𝗘𝗬 ] =====\n ◆━━━━━━━━━━━━━━━━◆\n [ 🐣  ] 𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐭𝐢𝐞̂̀𝐧 𝐜𝐮̉𝐚 %1 𝐭𝐫𝐨𝐧𝐠\n 𝐯𝐢́ 𝐡𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 𝐥𝐚̀: %2$"
  },
  "en": {
  "sotienbanthan": "Your current balance: %1$",
  "sotiennguoikhac": "%1's current balance: %2$."
  }
  }
  
  module.exports.run = async function({ api, event, args, Currencies, getText }) {
  const { threadID, messageID, senderID, mentions } = event;
  
  if (!args[0]) {
  const money = (await Currencies.getData(senderID)).money;
  return api.sendMessage(getText("sotienbanthan", money), threadID);
  }
  
  else if (Object.keys(event.mentions).length == 1) {
  var mention = Object.keys(mentions)[0];
  var money = (await Currencies.getData(mention)).money;
  if (!money) money = 0;
  return api.sendMessage({
  body: getText("sotiennguoikhac", mentions[mention].replace(/\@/g, ""), money),
  mentions: [{
  tag: mentions[mention].replace(/\@/g, ""),
  id: mention
  }]
  }, threadID, messageID);
  }
  
  else return global.utils.throwError(this.config.name, threadID, messageID);
  }