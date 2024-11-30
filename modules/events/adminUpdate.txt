module.exports.config = {
	name: "adminUpdate",
	eventType: ["log:thread-admins","log:thread-name", "log:user-nickname","log:thread-icon","log:thread-color","log:thread-poll"],
	version: "1.5.5",
	credits: "Mirai Project",
	description: "Cập nhật thông tin nhóm một cách nhanh chóng",
    envConfig: {
        autoUnsend: true,
        sendNoti: true,
        timeToUnsend: 10
    }
};

module.exports.run = async function ({ event, api, Threads,Users }) {
  const fs = require("fs");
	var iconPath = __dirname + "/adminUpdate/emoji.json";
  var namePath = __dirname + "/adminUpdate/namebox.json";
  var bietdanhPath = __dirname + "/adminUpdate/bietdanh.json";
  var chudePath = __dirname + "/adminUpdate/chude.json";
	if (!fs.existsSync(iconPath)) fs.writeFileSync(iconPath, JSON.stringify({}));
  if (!fs.existsSync(namePath)) fs.writeFileSync(namePath, JSON.stringify({}));
  if (!fs.existsSync(bietdanhPath)) fs.writeFileSync(bietdanhPath, JSON.stringify({}));
  if (!fs.existsSync(chudePath)) fs.writeFileSync(chudePath, JSON.stringify({}));

  const moment = require("moment-timezone");
  var tg = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
    const { threadID, logMessageType, logMessageData } = event;
    const { setData, getData } = Threads;
let thread = (await Threads.getData(event.threadID)).data || {};
    //const thread = global.data.threadData.get(threadID) || {};
    if (typeof thread["adminUpdate"] != "undefined" && thread["adminUpdate"] == false) return;

    try {
        let dataThread = (await getData(threadID)).threadInfo;
        switch (logMessageType) {
            case "log:thread-admins": {
                 if (logMessageData.ADMIN_EVENT == "add_admin") {
                    dataThread.adminIDs.push({ id: logMessageData.TARGET_ID })
                    if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[ 𝗨𝗣𝗗𝗔𝗧𝗘 ] → ${event.logMessageBody}\n→ Chức vụ trước đó: Thành viên`, threadID, async (error, info) => {
                        if (global.configModule[this.config.name].autoUnsend) {
                            await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                            return api.unsendMessage(info.messageID);
                        } else return;
                    });
                }
                else if (logMessageData.ADMIN_EVENT == "remove_admin") {
                    dataThread.adminIDs = dataThread.adminIDs.filter(item => item.id != logMessageData.TARGET_ID);
                    if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[ 𝗨𝗣𝗗𝗔𝗧𝗘 ] → ${event.logMessageBody}\n→ Chức vụ trước đó: Quản trị viên`, threadID, async (error, info) => {
                	if (global.configModule[this.config.name].autoUnsend) {
                            await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                            return api.unsendMessage(info.messageID);
                        } else return;
                    });
                }
                break;
            }

           case "log:user-nickname": {
                let preBietdanh = JSON.parse(fs.readFileSync(bietdanhPath));           dataThread.nicknames[logMessageData.participant_id] = logMessageData.nickname;
                if (typeof global.configModule["nickname"] != "undefined" && !global.configModule["nickname"].allowChange.includes(threadID) && !dataThread.adminIDs.some(item => item.id == event.author) || event.author == api.getCurrentUserID()) return;
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[ 𝗨𝗣𝗗𝗔𝗧𝗘 ] → ${event.logMessageBody}\n→ Biệt danh trước đó: ${preBietdanh[logMessageData.participant_id] || await Users.getNameUser(logMessageData.participant_id)}`, threadID, async (error, info) => {
                	preBietdanh[logMessageData.participant_id] = logMessageData.nickname;
                	fs.writeFileSync(bietdanhPath, JSON.stringify(preBietdanh));
                if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }
           /* case "log:thread-poll":
            {
                var str = event.logMessageData.question_json
                var obj = JSON.parse(str);
                if (event.logMessageData.event_type == "question_creation") {
                    return api.sendMessage(`[ 𝗨𝗣𝗗𝗔𝗧𝗘 ] → ${event.logMessageBody}`, threadID)
                }
                if (event.logMessageData.event_type == "update_vote") {
                    return api.sendMessage(`[ 𝗨𝗣𝗗𝗔𝗧𝗘 ] → ${event.logMessageBody}`, threadID)
                }
            }*/

            case "log:thread-name": {
              let preName = JSON.parse(fs.readFileSync(namePath));
                dataThread.threadName = event.logMessageData.name || "Tên không tồn tại";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[ 𝗨𝗣𝗗𝗔𝗧𝗘 ] → ${event.logMessageBody}\n→ Tên trước đó: ${preName[threadID] || "Không rõ" || event.logMessageData.name || "Không tên"}`, threadID, async (error, info) => {
                	preName[threadID] = dataThread.threadName;
                	fs.writeFileSync(namePath, JSON.stringify(preName));
                if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }

            case "log:thread-icon": {
            	let preIcon = JSON.parse(fs.readFileSync(iconPath));
            	dataThread.threadIcon = event.logMessageData.thread_icon || "👍";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[ 𝗨𝗣𝗗𝗔𝗧𝗘 ] → ${event.logMessageBody}\n→ Biểu tượng trước đó: ${preIcon[threadID] || "Không rõ"}`, threadID, async (error, info) => {
                	preIcon[threadID] = dataThread.threadIcon;
                	fs.writeFileSync(iconPath, JSON.stringify(preIcon));
                if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }
             case "log:thread-icon": {
            	let preIcon = JSON.parse(fs.readFileSync(iconPath));
            	dataThread.threadIcon = event.logMessageData.thread_icon || "👍";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`=====『 𝗚𝗥𝗢𝗨𝗣 𝗨𝗣𝗗𝗔𝗧𝗘 』=====\n\n${event.logMessageBody}\n➢ icon cũ: ${preIcon[threadID] || "không rõ"}\n\n====『 ${tg} 』====`, threadID, async (error, info) => {
                	preIcon[threadID] = dataThread.threadIcon;
                	fs.writeFileSync(iconPath, JSON.stringify(preIcon));
                });
                break;
            }
             case "log:thread-color": {
let preChude = JSON.parse(fs.readFileSync(chudePath));
            	dataThread.threadColor = event.logMessageData.thread_color || "🌤";
               
              if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[ 𝗨𝗣𝗗𝗔𝗧𝗘 ] → ${event.logMessageBody}\n→ Chủ đề trước đó: ${preChude[threadID].themeName || "không rõ"}\n → Emoji: ${preChude[threadID].themeEmoji || "không rõ"}`, threadID, async (error, info) => {
                  preChude[threadID] = { 
                    themeName: logMessageData.theme_name_with_subtitle,
                    themeEmoji: logMessageData.theme_emoji ?
logMessageData.theme_emoji: "không rõ"                                       }
                	fs.writeFileSync(chudePath, JSON.stringify(preChude));
                });
                break;
            }
        }
        await setData(threadID, { threadInfo: dataThread });
    } catch (e) { console.log(e) };
}