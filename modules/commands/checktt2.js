module .exports .config = {
    name: "checktt2",
    version: "1.6.0",
    hasPermssion: 0,
    credits: "Mirai Team fix get by D-Jukie and mod by JRT",
    description: "Kiểm tra lượt tương tác trong nhóm",
    commandCategory: "Thống kê",
    usages: "[all/tag]",
    cooldowns: 5
};

module.exports.languages = {
    "vi": { "all": "[%1]→ %2 đang xếp hạng với tổng số tin nhắn là: %3\n",
    },
    "en": { "all": "%1/ %2 with %3 messages\n",
    }
}
module .exports .run = async function ({ args,Users,Threads, api, event, Currencies, getText }) {
var mention = Object.keys(event.mentions);
const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
  const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("D/MM/YYYY || HH:mm:ss");
    var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = 'Chủ Nhật'
  if (thu == 'Monday') thu = 'Thứ Hai'
  if (thu == 'Tuesday') thu = 'Thứ Ba'
  if (thu == 'Wednesday') thu = 'Thứ Tư'
  if (thu == "Thursday") thu = 'Thứ Năm'
  if (thu == 'Friday') thu = 'Thứ Sáu'
  if (thu == 'Saturday') thu = 'Thứ Bảy'
const res = await axios.get("https://apimyjrt.jrtxtracy.repl.co/hololive.php");
//lấy data trên web api
const data = res.data.data;
//tải ảnh xuống
let download = (await axios.get(data, {
			responseType: "stream"
		})).data;
if (args[0] == "all") {
            var { participantIDs, adminIDs } =(await Threads.getData(event.threadID)).threadInfo;   
            //const countMess = (await Currencies.getData(event.senderID)).exp
            const listUserID = event.participantIDs
            var id = listUserID //[Math.floor(Math.random() * listUserID.length)];
            var number = 1, msg = "", storage = [], exp = [];
            for(const idUser of listUserID) {
            const countMess = await Currencies.getData(idUser);
            exp.push({"name" : (typeof ((await Users.getData(idUser)).name) == "undefined") ? 0 : (await Users.getData(idUser)).name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp, "uid": idUser});
        }
           
            exp.sort(function (a, b) { return b.exp - a.exp });
            for (const lastData of exp)  msg += getText("all", number++, lastData.name, lastData.exp);

            return api.sendMessage({ body: `=== Check tương tác all ===\n◆━━━━━━━━━━◆\n\n` + msg + `\n\n━━━━━━━━━━━━━━━\n=== 『 𝐁𝐎𝐓 』 ===n\n===「${thu} || ${gio}」===`, attachment: download }, event.threadID, event.messageID);

}
    else 
    if(event.type == "message_reply") { mention[0] = event.messageReply.senderID }
    if (mention[0]) {
            var { participantIDs } =(await Threads.getData(event.threadID)).threadInfo;
            //const countMess = (await Currencies.getData(event.senderID)).exp
            const listUserID = event.participantIDs
            var id = listUserID //[Math.floor(Math.random() * listUserID.length)];
            exp = [];
            //var name = await Users.getData(id)
            for(const idUser of listUserID) {
            const countMess = await Currencies.getData(idUser);
            exp.push({"name" : idUser.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp, "uid": idUser});
        }
            exp.sort(function (a, b) { return b.exp - a.exp });
            const rank = exp.findIndex(info => parseInt(info.uid) == parseInt(mention[0])) + 1;
            const infoUser = exp[rank - 1];
            //const rank = exp.findIndex(info => parseInt(info.listUserID) == parseInt(event.senderID)) + 1;
            return api.sendMessage({ body: `=== 『 𝐁𝐎𝐓 』 ===\n\n${(await Users.getData(mention[0])).name} đang đứng hạng ${rank} với tổng số tin nhắn là: ${infoUser.exp}\n\n━━━━━━━━━━━━━━━\n=== 『 𝐁𝐎𝐓 』 ===\n\n===「${thu} || ${gio}」===`,attachment: download }, event.threadID, event.messageID);
}
else {
            var { participantIDs } =(await Threads.getData(event.threadID)).threadInfo;
            //const countMess = (await Currencies.getData(event.senderID)).exp
            const listUserID = event.participantIDs
            var id = listUserID //[Math.floor(Math.random() * listUserID.length)];
            exp = [];
            var name = await Users.getData(id)
            for(const idUser of listUserID) {
            const countMess = await Currencies.getData(idUser);
            exp.push({"name" : idUser.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp, "uid": idUser});
        }
            exp.sort(function (a, b) { return b.exp - a.exp });
            const rank = exp.findIndex(info => parseInt(info.uid) == parseInt(event.senderID)) + 1;
            const infoUser = exp[rank - 1];
          
            return api.sendMessage({ body: `=== 『 𝐁𝐎𝐓 』 ===\n\nBạn đang đứng hạng ${rank} với tổng số tin nhắn là: ${infoUser.exp}\n\n━━━━━━━━━━━━━━━\n=== 『 𝐁𝐎𝐓 』 ===\n\n===「${thu} || ${gio}」===`,attachment: download }, event.threadID, event.messageID);
}
}