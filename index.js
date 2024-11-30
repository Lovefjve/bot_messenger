const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
const http = require("http");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log");
const express = require('express');
const path = require('path');
const chalk = require('chalkercli');
const chalk1 = require('chalk');
const CFonts = require('cfonts');
const app = express();
const port = process.env.PORT || 2006;
const moment = require("moment-timezone");
var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
if (thu == 'Sunday') thu = '𝐶ℎ𝑢̉ 𝑁ℎ𝑎̣̂𝑡'
if (thu == 'Monday') thu = '𝑇ℎ𝑢̛́ 𝐻𝑎𝑖 '
if (thu == 'Tuesday') thu = '𝑇ℎ𝑢̛́ 𝐵𝑎'
if (thu == 'Wednesday') thu = '𝑇ℎ𝑢̛́ 𝑇𝑢̛'
if (thu == "Thursday") thu = '𝑇ℎ𝑢̛́ 𝑁𝑎̆𝑚'
if (thu == 'Friday') thu = '𝑇ℎ𝑢̛́ 𝑆𝑎́𝑢'
if (thu == 'Saturday') thu = '𝑇ℎ𝑢̛́ 𝐵𝑎̉𝑦'




console.log('ㅤㅤㅤㅤ            𝐻𝑜̂𝑚 𝑛𝑎𝑦 𝑙𝑎̀:' +  thu,'𝐶ℎ𝑢́𝑐 𝑏𝑎̣𝑛 𝑐𝑜́ 𝑚𝑜̣̂𝑡 𝑛𝑔𝑎̀𝑦 𝑣𝑢𝑖 𝑣𝑒̉\n' )



app.get('/', function(req, res) {
  
    res.sendFile(path.join(__dirname, '/index.html'));
  
});


app.listen(port);
console.log('𝑀𝑎́𝑦 𝑐ℎ𝑢̉ 𝑏𝑎̆́𝑡 đ𝑎̂̀𝑢 𝑡𝑎̣𝑖 http://localhost:' + port,"𝑉𝑎̀𝑜 𝑙𝑢́𝑐:" + gio,"\n\n");


logger("𝙻𝚒𝚎̂𝚗 𝚑𝚎̣̂ 𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔: https://www.facebook.com/hieukks", "𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔");


const rainbow = chalk.rainbow(`\nㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ『=== 𝐌𝐚𝐫𝐢𝐬𝐯𝟐  ===』\n`).stop();
rainbow.render();
const frame = rainbow.frame(); 
console.log(frame);
logger("𝕐𝕠𝕦𝕣 𝕧𝕖𝕣𝕤𝕚𝕠𝕟 𝕚𝕤 𝕥𝕙𝕖 𝕝𝕒𝕥𝕖𝕤𝕥!", "UPDATE");


function startBot(message) {
    (message) ? logger(message, "BOT ĐANG KHỞI ĐỘNG") : "";

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "main.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

   child.on("close",async (codeExit) => {
      var x = 'codeExit'.replace('codeExit',codeExit);
        if (codeExit == 1) return startBot("BOT RESTARTING!!!");
         else if (x.indexOf(2) == 0) {
           await new Promise(resolve => setTimeout(resolve, parseInt(x.replace(2,'')) * 1000));
                 startBot("Bot has been activated please wait a moment!!!");
       }
         else return; 
    });

    child.on("error", function (error) {
        logger("An error occurred: " + JSON.stringify(error), "[ Starting ]");
    });
};
axios.get("https://raw.githubusercontent.com/tandung1/Bot12/main/package.json").then((res) => {
    logger(res['data']['name'], "[ TÊN PR0JECT ]");
    logger("Version: " + res['data']['version'], "[ PHIÊN BẢN ]");
    logger(res['data']['description'], "[ LƯU Ý ]");
})
setTimeout(async function () {
CFonts.say('Maris v3', {
		font: 'block',
    	align: 'center',
  gradient: ['red', 'magenta']
		})
CFonts.say(`Bot Messenger Created By Vtuan`, {
		font: 'console',
		align: 'center',
		gradient: ['red', 'magenta']
		})
  CFonts.say('Vtuan\n', {
		font: 'block',
    	align: 'center',
  gradient: ['red', 'magenta']
		})

rainbow.render(); 

const frame = rainbow.frame(); 
console.log(frame);
  
  logger('𝙱𝚊̆́𝚝 đ𝚊̂̀𝚞 𝚕𝚘𝚊𝚍 𝚜𝚘𝚞𝚛𝚌𝚎 𝚌𝚘𝚍𝚎', 'LOAD')
  startBot()
}, 70)