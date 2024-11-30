module.exports.config = {
    name: "info",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "HungCho Mod By NguyenHoangAnhProCoder",
    description: "",
    commandCategory: "Tiện ích",
    usages: "",
    cooldowns: 4,
    dependencies: {
        "request": "",
        "fs": ""    }
    
};

module.exports.run = async({api,event,args, Threads}) => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
          //getPrefix
        const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
        const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
     if (args.length == 0) return api.sendMessage(`[ 🐳 ] 𝐁𝐚̣𝐧 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐝𝐮̀𝐧𝐠:\n\n${prefix}${this.config.name} 𝐮𝐬𝐞𝐫 => 𝐧𝐨́ 𝐬𝐞̃ 𝐥𝐚̂́𝐲 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐜𝐮̉𝐚 𝐜𝐡𝐢́𝐧𝐡 𝐛𝐚̣𝐧.\n\n${prefix}${this.config.name} 𝐮𝐬𝐞𝐫 @[𝐓𝐚𝐠] => 𝐧𝐨́ 𝐬𝐞̃ 𝐥𝐚̂́𝐲 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐛𝐚̣𝐧 𝐭𝐚𝐠.\n\n${prefix}${this.config.name} 𝐛𝐨𝐱 => 𝐧𝐨́ 𝐬𝐞̃ 𝐥𝐚̂́𝐲 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐛𝐨𝐱 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧.\n\n${prefix}${this.config.name} 𝐚𝐝𝐦𝐢𝐧 => 𝐚𝐝𝐦𝐢𝐧 => 𝐧𝐨́ 𝐬𝐞̃ 𝐥𝐚̂́𝐲 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐜𝐮̉𝐚 𝐚𝐝𝐦𝐢𝐧.`, event.threadID, event.messageID);
    if (args[0] == "box") {
           if(args[1]){ let threadInfo = await api.getThreadInfo(args[1]);
           let imgg = threadInfo.imageSrc;
           var gendernam = [];
            var gendernu = [];
                for (let z in threadInfo.userInfo) {
                var gioitinhone = threadInfo.userInfo[z].gender;
                if(gioitinhone == "MALE"){gendernam.push(gioitinhone)
                }else{gendernu.push(gioitinhone)
                }};
             var nam = gendernam.length;
             var nu = gendernu.length;
             let sex = threadInfo.approvalMode;
       var pd = sex == false ? "tắt" : sex == true ? "bật" : "Kh";
       if(!imgg) api.sendMessage(`====== [ 𝐈𝐍𝐅𝐎 𝐁𝐎𝐗 ] ======\n ◆━━━━━━━━━━━━━━━━◆\n\n[👀] 𝐓𝐞̂𝐧 𝐧𝐡𝐨́𝐦: ${threadInfo.threadName}\n[🐧] 𝐈𝐃 𝐧𝐡𝐨́𝐦: ${args[1]}\n[🦋] 𝐏𝐡𝐞̂ 𝐝𝐮𝐲𝐞̣̂𝐭: ${pd}\n[🐤] 𝐄𝐦𝐨𝐣𝐢: ${threadInfo.emoji}\n[☺️] 𝐓𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧: \n» ${threadInfo.participantIDs.length} 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐯𝐚̀ ${threadInfo.adminIDs.length} 𝐪𝐮𝐚̉𝐧 𝐭𝐫𝐢̣ 𝐯𝐢𝐞̂𝐧.\n» 𝐆𝐨̂̀𝐦 ${nam} 𝐧𝐚𝐦 𝐯𝐚̀ ${nu} 𝐧𝐮̛̃.\n» 𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧: ${threadInfo.messageCount}.`,event.threadID,event.messageID);
        else var callback = () => api.sendMessage({body:`====== [ 𝐈𝐍𝐅𝐎 𝐁𝐎𝐗 ] ======\n ◆━━━━━━━━━━━━━━━━◆\n\n[👀] 𝐓𝐞̂𝐧 𝐧𝐡𝐨́𝐦: ${threadInfo.threadName}\n[🐧] 𝐈𝐃 𝐧𝐡𝐨́𝐦: ${args[1]}\n[🦋] 𝐏𝐡𝐞̂ 𝐝𝐮𝐲𝐞̣̂𝐭: ${pd}\n[🐤] 𝐄𝐦𝐨𝐣𝐢: ${threadInfo.emoji}\n[☺️] 𝐓𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧: \n» ${threadInfo.participantIDs.length} 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐯𝐚̀ ${threadInfo.adminIDs.length} 𝐪𝐮𝐚̉𝐧 𝐭𝐫𝐢̣ 𝐯𝐢𝐞̂𝐧.\n» 𝐆𝐨̂̀𝐦 ${nam} 𝐧𝐚𝐦 𝐯𝐚̀ ${nu} 𝐧𝐮̛̃.\n» 𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧: ${threadInfo.messageCount}.`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID); 
      return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
      
      }
          
            let threadInfo = await api.getThreadInfo(event.threadID);
            let img = threadInfo.imageSrc;
            var gendernam = [];
            var gendernu = [];
                for (let z in threadInfo.userInfo) {
                var gioitinhone = threadInfo.userInfo[z].gender;
                if(gioitinhone == "MALE"){gendernam.push(gioitinhone)
                }else{gendernu.push(gioitinhone)
                }};
             var nam = gendernam.length;
             var nu = gendernu.length;
             let sex = threadInfo.approvalMode;
       var pd = sex == false ? "tắt" : sex == true ? "bật" : "Kh";
          if(!img) api.sendMessage(`====== [ 𝐈𝐍𝐅𝐎 𝐁𝐎𝐗 ] ======\n ◆━━━━━━━━━━━━━━━━◆\n\n[👀] 𝐓𝐞̂𝐧 𝐧𝐡𝐨́𝐦: ${threadInfo.threadName}\n[🐧] 𝐈𝐃 𝐧𝐡𝐨́𝐦: ${args[1]}\n[🦋] 𝐏𝐡𝐞̂ 𝐝𝐮𝐲𝐞̣̂𝐭: ${pd}\n[🐤] 𝐄𝐦𝐨𝐣𝐢: ${threadInfo.emoji}\n[☺️] 𝐓𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧: \n» ${threadInfo.participantIDs.length} 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐯𝐚̀ ${threadInfo.adminIDs.length} 𝐪𝐮𝐚̉𝐧 𝐭𝐫𝐢̣ 𝐯𝐢𝐞̂𝐧.\n» 𝐆𝐨̂̀𝐦 ${nam} 𝐧𝐚𝐦 𝐯𝐚̀ ${nu} 𝐧𝐮̛̃.\n» 𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧: ${threadInfo.messageCount}.`,event.threadID,event.messageID)
          else  var callback = () => api.sendMessage({body:`====== [ 𝐈𝐍𝐅𝐎 𝐁𝐎𝐗 ] ======\n ◆━━━━━━━━━━━━━━━━◆\n\n[👀] 𝐓𝐞̂𝐧 𝐧𝐡𝐨́𝐦: ${threadInfo.threadName}\n[🐧] 𝐈𝐃 𝐧𝐡𝐨́𝐦: ${args[1]}\n[🦋] 𝐏𝐡𝐞̂ 𝐝𝐮𝐲𝐞̣̂𝐭: ${pd}\n[🐤] 𝐄𝐦𝐨𝐣𝐢: ${threadInfo.emoji}\n[☺️] 𝐓𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧: \n» ${threadInfo.participantIDs.length} 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐯𝐚̀ ${threadInfo.adminIDs.length} 𝐪𝐮𝐚̉𝐧 𝐭𝐫𝐢̣ 𝐯𝐢𝐞̂𝐧.\n» 𝐆𝐨̂̀𝐦 ${nam} 𝐧𝐚𝐦 𝐯𝐚̀ ${nu} 𝐧𝐮̛̃.\n» 𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧: ${threadInfo.messageCount}.`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);   
      return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
    }
               if (args.length == 0) return api.sendMessage(`[ 🐳 ] 𝐁𝐚̣𝐧 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐝𝐮̀𝐧𝐠:\n\n${prefix}${this.config.name} 𝐮𝐬𝐞𝐫 => 𝐧𝐨́ 𝐬𝐞̃ 𝐥𝐚̂́𝐲 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐜𝐮̉𝐚 𝐜𝐡𝐢́𝐧𝐡 𝐛𝐚̣𝐧.\n\n${prefix}${this.config.name} 𝐮𝐬𝐞𝐫 @[𝐓𝐚𝐠] => 𝐧𝐨́ 𝐬𝐞̃ 𝐥𝐚̂́𝐲 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐛𝐚̣𝐧 𝐭𝐚𝐠.\n\n${prefix}${this.config.name} 𝐛𝐨𝐱 => 𝐧𝐨́ 𝐬𝐞̃ 𝐥𝐚̂́𝐲 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐛𝐨𝐱 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧.\n\n${prefix}${this.config.name} 𝐚𝐝𝐦𝐢𝐧 => 𝐚𝐝𝐦𝐢𝐧 => 𝐧𝐨́ 𝐬𝐞̃ 𝐥𝐚̂́𝐲 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐜𝐮̉𝐚 𝐚𝐝𝐦𝐢𝐧.`, event.threadID, event.messageID);
    if (args[0] == "admin") {
      var callback = () => api.sendMessage(
  {body:`梁𝗔𝗗𝗠𝗜𝗡梁\n-------------------
  
 [👀] 𝐓𝐞̂𝐧: ?
 [❎] 𝐓𝐮𝐨̂̉𝐢: ?
 [👤] 𝐆𝐢𝐨̛́𝐢 𝐭𝐢́𝐧𝐡: 𝐍𝐚𝐦
 [🙄] 𝐒𝐢𝐧𝐡 𝐧𝐠𝐚̀𝐲: ?
 [💫] 𝐂𝐡𝐢𝐞̂̀𝐮 𝐜𝐚𝐨 / 𝐜𝐚̂𝐧 𝐧𝐚̣̆𝐧𝐠: ? / ?𝐤𝐠
 [💘] 𝐌𝐨̂́𝐢 𝐪𝐮𝐚𝐧 𝐡𝐞̣̂: Đ𝐨̣̂𝐜 𝐓𝐡𝐚̂𝐧
 [😎] 𝐐𝐮𝐞̂ 𝐪𝐮𝐚́𝐧: 𝐓𝐫𝐚́𝐢 đ𝐚̂́𝐭
 [🤔] 𝐍𝐨̛𝐢 𝐨̛̉: 𝐒𝐚𝐨 𝐇𝐨̉𝐚
 [♊] 𝐂𝐮𝐧𝐠: 𝐂𝐮𝐧𝐠 𝐭𝐫𝐚̆𝐧𝐠 𝐜𝐨́ 𝐜𝐡𝐮́ 𝐜𝐮𝐨̣̂𝐢
 [👫] 𝐆𝐮: 𝐋𝐨 𝐥𝐚̆́𝐧𝐠 𝐪𝐮𝐚𝐧 𝐭𝐚̂𝐦 𝐯𝐚̣̂𝐲 𝐥𝐚̀ 𝐝𝐮̉ :)))
 [🌸] 𝐓𝐢́𝐧𝐡 𝐜𝐚́𝐜𝐡: 𝐓𝐢𝐞̂́𝐩 𝐱𝐮́𝐜 𝐫𝐨̂̀𝐢 𝐛𝐢𝐞̂́𝐭?
 [📱] 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤: https://www.facebook.com/hieukks

            ---- Lovefjve ----`,
    attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => 
    fs.unlinkSync(__dirname + "/cache/1.png"));  
      return request(
        encodeURI(`https://graph.facebook.com/${100080306074477}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(
fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
    
      };

if (args[0] == "user") { 
    if(!args[1]){
    if(event.type == "message_reply") id = event.messageReply.senderID
    else id = event.senderID;
    let data = await api.getUserInfo(id);
    let url = data[id].profileUrl;
    let b = data[id].isFriend == false ? "Chưa" : data[id].isFriend == true ? "Rồi" : "Đéo";
    let sn = data[id].vanity;
    let name = await data[id].name;
    var sex = await data[id].gender;
    var gender = sex == 2 ? "Nam" : sex == 1 ? "Nữ" : "Trần Đức Bo";
    var callback = () => api.sendMessage({body:`===== [ 𝐈𝐍𝐅𝐎 𝐔𝐒𝐄𝐑 ] =====\n◆━━━━━━━━━━━━━━━━◆\n\n[😚] 𝐓𝐞̂𝐧 𝐮𝐬𝐞𝐫: ${name}` + `\n[🏝] 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤: ${url}` + `\n[💦] 𝐔𝐬𝐞𝐫𝐧𝐚𝐦𝐞: ${sn}\n[🐧] 𝐈𝐝 𝐮𝐬𝐞𝐫: ${id}\n[🦋] 𝐆𝐢𝐨̛́𝐢 𝐭𝐢́𝐧𝐡: ${gender}\n[❄️] 𝐊𝐞̂́𝐭 𝐛𝐚̣𝐧 𝐯𝐨̛́𝐢 𝐛𝐨𝐭: ${b}`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
       return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
   }
    else {
    
    if (args.join().indexOf('@') !== -1){
    var mentions = Object.keys(event.mentions)
    let data = await api.getUserInfo(mentions);
    let url = data[mentions].profileUrl;
    let b = data[mentions].isFriend == false ? "Chưa" : data[mentions].isFriend == true ? "Rồi" : "Đéo";
    let sn = data[mentions].vanity;
    let name = await data[mentions].name;
    var sex = await data[mentions].gender;
    var gender = sex == 2 ? "Nam" : sex == 1 ? "Nữ" : "Trần Đức Bo";
    var callback = () => api.sendMessage({body:`===== [ 𝐈𝐍𝐅𝐎 𝐔𝐒𝐄𝐑 ] =====\n◆━━━━━━━━━━━━━━━━◆\n\n[😚] 𝐓𝐞̂𝐧 𝐮𝐬𝐞𝐫: ${name}` + `\n[🏝] 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤: ${url}` + `\n[💦] 𝐔𝐬𝐞𝐫𝐧𝐚𝐦𝐞: ${sn}\n[🐧] 𝐈𝐝 𝐮𝐬𝐞𝐫: ${id}\n[🦋] 𝐆𝐢𝐨̛́𝐢 𝐭𝐢́𝐧𝐡: ${gender}\n[❄️] 𝐊𝐞̂́𝐭 𝐛𝐚̣𝐧 𝐯𝐨̛́𝐢 𝐛𝐨𝐭: ${b}`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
       return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
    }
    else {
    let data = await api.getUserInfo(args[1]);
    let url = data[args[1]].profileUrl;
    let b = data[args[1]].isFriend == false ? "Chưa" : data[args[1]].isFriend == true ? "Rồi" : "Đéo";
    let sn = data[args[1]].vanity;
    let name = await data[args[1]].name;
    var sex = await data[args[1]].gender;
    var gender = sex == 2 ? "Nam" : sex == 1 ? "Nữ" : "Trần Đức Bo";
    var callback = () => api.sendMessage({body:`===== [ 𝐈𝐍𝐅𝐎 𝐔𝐒𝐄𝐑 ] =====\n◆━━━━━━━━━━━━━━━━◆\n\n[😚] 𝐓𝐞̂𝐧 𝐮𝐬𝐞𝐫: ${name}` + `\n[🏝] 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤: ${url}` + `\n[💦] 𝐔𝐬𝐞𝐫𝐧𝐚𝐦𝐞: ${sn}\n[🐧] 𝐈𝐝 𝐮𝐬𝐞𝐫: ${id}\n[🦋] 𝐆𝐢𝐨̛́𝐢 𝐭𝐢́𝐧𝐡: ${gender}\n[❄️] 𝐊𝐞̂́𝐭 𝐛𝐚̣𝐧 𝐯𝐨̛́𝐢 𝐛𝐨𝐭: ${b}`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
       return request(encodeURI(`https://graph.facebook.com/${args[1]}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
   }
  }
 }  
  }