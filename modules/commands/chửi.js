module.exports.config = {
	name: "chửi",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Hwan",
	description: "",
	commandCategory: "Noprefix",
	usages: "",
	cooldowns: 0,
	dependencies: {
	  "fs-extra": "",
	  "axios": ""
	}
  };
  
  module.exports.handleEvent = async ({ api, event }) => {
	try {
	  if (
		event.body.indexOf("chửi đi bot") === 0 ||
		event.body.indexOf("Chửi đi bot") === 0 ||
		event.body.indexOf("Chửi đi") === 0 ||
		event.body.indexOf("chửi đi") === 0
	  ) {
		const axios = global.nodemodule["axios"];
		const fs = global.nodemodule["fs-extra"];
		const link = ["https://files.catbox.moe/kd8unw.mp3"];
  
		if (link.length > 0) {
		  const selectedLink = link[Math.floor(Math.random() * link.length)];
		  const response = await axios.get(selectedLink, { responseType: 'stream' });
  
		  const callback = () => api.sendMessage({
			body: `[ 🐳 ] 𝐓𝐫𝐨̛̀𝐢 đ𝐚̂́𝐭 𝐝𝐮𝐧𝐠 𝐡𝐨𝐚 𝐯𝐚̣n 𝐯𝐚̣̂t 𝐬𝐢𝐧𝐡 𝐬𝐨̂𝐢 𝐜𝐨𝐧 𝐦𝐞̣ 𝐦𝐚̀y 𝐥𝐨̂𝐢 𝐭𝐡𝐨̂𝐢\n`,
			attachment: fs.createReadStream(__dirname + "/cache/chửiss.mp3")
		  }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/chửiss.mp3"), event.messageID);
  
		  response.data.pipe(fs.createWriteStream(__dirname + "/cache/chửiss.mp3"));
		  response.data.on("close", callback);
		}
	  }
	} catch (error) {
	  console.error("Error handling event:", error.message);
	}
  };
  
  module.exports.run = async ({ api, event, args, Users, Threads, Currencies }) => {
	// Your run function code here
  };
  