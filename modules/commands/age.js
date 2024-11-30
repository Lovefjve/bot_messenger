module.exports.config = {
  name: "age",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Orson",
  description: "age no api =))",
  commandCategory: "Công cụ",
  usages: "[ngày/tháng/năm sinh]",
  cooldowns: 0
};

module.exports.run = function ({ event, args, api, getText }) {
  const moment = require("moment-timezone");
  var date = new Date();
  var yearin = moment.tz("Asia/Ho_Chi_Minh").format("YYYY");
  var dayin = moment.tz("Asia/Ho_Chi_Minh").format("DD");
  var monthin = moment.tz("Asia/Ho_Chi_Minh").format("MM");
  var input = args[0];
  if (!input) return api.sendMessage("𝐒𝐚𝐢 𝐝𝐢𝐧𝐡 𝐝𝐚𝐧𝐠", event.threadID);
  var content = input.split("/");
  var dayout = parseInt(content[0]);
  if (!dayout || isNaN(dayout) || dayout > 31 || dayout < 1) { return api.sendMessage("𝐍𝐠𝐚𝐲 𝐬𝐢𝐧𝐡 𝐤𝐡𝐨𝐧𝐠 𝐡𝐨𝐩 𝐥𝐞!", event.threadID)}
  var monthout = parseInt(content[1]);
  if (!monthout || isNaN(monthout) || monthout > 12 || monthout < 1) { return api.sendMessage("𝐓𝐡𝐚𝐧𝐠 𝐬𝐢𝐧𝐡 𝐤𝐡𝐨𝐧𝐠 𝐡𝐨𝐩 𝐥𝐞!", event.threadID)}
  var yearout = parseInt(content[2]);
  if (!yearout || isNaN(yearout) || yearout > yearin || yearout < 1) { return api.sendMessage("𝐍𝐚𝐦 𝐬𝐢𝐧𝐡 𝐤𝐡𝐨𝐧𝐠 𝐡𝐨𝐩 𝐥𝐞!", event.threadID)}
  var tuoi = yearin - yearout
  var msg = `𝐍𝐚𝐦 𝐧𝐚𝐲 𝐛𝐚𝐧 ${tuoi} 𝐭𝐮𝐨𝐢`
    if (monthout > monthin) {var tuoi = tuoi - 1; var aftermonth = monthout - monthin; var msg = `𝐍𝐚𝐦 𝐧𝐚𝐲 𝐛𝐚𝐧 ${tuoi} 𝐭𝐮𝐨𝐢\n𝐂𝐨𝐧  ${aftermonth} 𝐭𝐡𝐚𝐧𝐠 𝐧𝐮𝐚 𝐥𝐚 𝐛𝐚𝐧 𝐬𝐞 𝐭𝐫𝐨𝐧 ${tuoi + 1}  𝐭𝐮𝐨𝐢`};
  if (monthin == monthout && dayin < dayout) {var tuoi = tuoi - 1; var afterday = dayout - dayin; var msg = `𝐍𝐚𝐦 𝐧𝐚𝐲 𝐛𝐚𝐧 ${tuoi} 𝐭𝐮𝐨𝐢\n𝐂𝐨𝐧 ${afterday} 𝐧𝐠𝐚𝐲 𝐧𝐮𝐚 𝐥𝐚 𝐛𝐚𝐧 𝐬𝐞 𝐭𝐫𝐨𝐧 ${tuoi + 1} 𝐭𝐮𝐨𝐢`};
  return api.sendMessage(msg, event.threadID)
}