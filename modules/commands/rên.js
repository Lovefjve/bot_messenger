module.exports.config = {
    name: "rên",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Hwan",
    description: "",
    commandCategory: "Noprefix",
    usages: "",
    cooldowns: 0,
    denpendencies: {
      "fs-extra": "",
      "request": ""
    }
  };
  
  module.exports.handleEvent = async ({ api, event, Threads }) => {
    if (
      event.body.indexOf("Rên đi bot")==0 ||
      event.body.indexOf("rên đi bot")==0 ||
      event.body.indexOf("Rên đi")==0 ||
      event.body.indexOf("Rên đi andree")==0 ||
      event.body.indexOf("rên đi andree")==0 ||
      event.body.indexOf("kimochi")==0 ||
      event.body.indexOf("yamate")==0 ||
      event.body.indexOf("Yamate")==0 ||
      event.body.indexOf("rên đi em")==0 ||
      event.body.indexOf("Rên đi em")==0 ||
      event.body.indexOf("rên")==0 ||
      event.body.indexOf("Rên")==0 ||
      event.body.indexOf("Kimochi")==0 ||
      event.body.indexOf("rên đi")==0 ||
      event.body.indexOf("nwngs")==0 ||
      event.body.indexOf("nứng")==0 ||
      event.body.indexOf("Nứng")==0 ||
      event.body.indexOf("Nwngs")==0
    ) {
      const axios = global.nodemodule["axios"];
      const request = global.nodemodule["request"];
      const fs = global.nodemodule["fs-extra"];
      try {
        const link = [
          "https://files.catbox.moe/kgo1ej.mp3",
          "https://files.catbox.moe/vdrof2.mp3",
          "https://files.catbox.moe/xnyzps.mp3",
          "https://files.catbox.moe/y0xblg.mp3"
        ];
        
        const response = await axios({
          method: 'get',
          url: link[Math.floor(Math.random() * link.length)],
          responseType: 'stream',
          timeout: 5000 // Thời gian chờ, có thể tăng giảm tùy theo môi trường
        });
  
        const callback = () =>
          api.sendMessage(
            {
              body: `[ 🐳 ] 𝐀𝐧𝐡 𝐤𝐢̀ 𝐪𝐮𝐚́ 𝐚̀, 𝐮̛𝐦~ 𝐚 𝐚 ~~\n`,
              attachment: fs.createReadStream(__dirname + "/cache/rên.mp3")
            },
            event.threadID,
            () => fs.unlinkSync(__dirname + "/cache/rên.mp3"),
            event.messageID
          );
  
        response.data.pipe(fs.createWriteStream(__dirname + "/cache/rên.mp3"));
        response.data.on("close", callback);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };
  
  module.exports.run = async ({ api, event, args, Users, Threads, Currencies }) => {
    // Các logic xử lý trong hàm run
  };
  