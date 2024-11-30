module.exports.config = {
	name: "ngủ",
	version: "1.0.1",
	hasPermission: 0,
	credits: "Hwan",
	description: "",
	commandCategory: "Noprefix",
	usages: "",
	cooldowns: 0,
	dependencies: {
	  "fs-extra": "",
	  "request": ""
	}
  };
  
  module.exports.handleEvent = async ({ api, event, Threads }) => {
	const { body, threadID } = event;
  
	const nguKeywords = [
	  "ngủ",
	  "Ngủ",
	  "ngủ thôi",
	  "Ngủ đi",
	  "Ngủ thôi",
	  "ngủ đi",
	  "thôi đi ngủ",
	  "ngủ ngon",
	  "Ngủ ngon",
	  "Thôi đi ngủ"
	];
  
	if (nguKeywords.some(keyword => body.indexOf(keyword) === 0)) {
	  const axios = global.nodemodule["axios"];
	  const request = global.nodemodule["request"];
	  const fs = global.nodemodule["fs-extra"];
	  
	  const links = [
		"https://i.imgur.com/TrXU5qW.mp4",
		"https://i.imgur.com/qxNrZLH.mp4",
		"https://i.imgur.com/WM4SGle.mp4",
		"https://i.imgur.com/GuHFmYv.mp4"
	  ];
  
	  const randomLink = links[Math.floor(Math.random() * links.length)];
  
	  const callback = () => {
		api.sendMessage({
		  body: ` [ 🐳 ] 𝐁𝐲𝐞, 𝐛𝐚𝐞 𝐜𝐮̉𝐚 𝐭𝐨̛́ 𝐧𝐠𝐮̉ 𝐧𝐠𝐨𝐧 𝐧𝐡𝐞́<𝟑\n\n00:45 ━●━━━━━━━━━━━━━━━ 5:50\n⇆ㅤㅤㅤ ㅤ◁ㅤㅤ❚❚ㅤㅤ▷ㅤ ㅤㅤㅤ↻`,
		  attachment: fs.createReadStream(__dirname + "/cache/ngủ.mp4")
		}, threadID, () => fs.unlinkSync(__dirname + "/cache/ngủ.mp4"), event.messageID);
	  };
  
	  return request(encodeURI(randomLink)).pipe(fs.createWriteStream(__dirname + "/cache/ngủ.mp4")).on("close", callback);
	}
  };
  
  module.exports.run = async ({ api, event, args, Users, Threads, Currencies }) => {
	// Your run function code here
  };
  