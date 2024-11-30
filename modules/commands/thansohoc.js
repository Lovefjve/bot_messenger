const fs = require('fs-extra');
const { join } = require('path');
const axios = require('axios');

const PYTHAGOREAN = {
  'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
  'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
  's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
};

function removeAccent(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

function preprocessStr(str) {
  str = str.toLowerCase();
  str = removeAccent(str);
  str = str.replace(/[^a-z\s]/gi, ' ').replace(/\s+/g, ' ').trim();
  return str.split(" ");
}

function reduceSumPythagoras(num) {
  if (isNaN(num)) return 0;
  let rsum = num;
  while (![11, 22, 33].includes(rsum) && String(rsum).length > 1) {
    rsum = String(rsum).split('').map(Number).reduce((a, b) => a + b, 0);
  }
  return rsum;
}

function calcWordValue(word, mode = "ALL") {
  if (word.length == 0) return 0;
  let wordValue = 0;
  let letters = word.split('');
  if (mode === "DLBT") {
    for (let i = 1; i < letters.length; ++i) {
      if (letters[i] === "y" && "ueoai".includes(letters[i - 1])) letters[i] = ".";
    }
    for (let i = 0; i < letters.length; ++i) {
      if (!"ueoaiy".includes(letters[i])) letters[i] = ".";
    }
  } else if (mode === "NC") {
    if (letters[0] === "y") letters[0] = ".";
    for (let i = 1; i < letters.length; ++i) {
      if (letters[i] === "y" && !"ueoai".includes(letters[i - 1])) letters[i] = ".";
    }
    for (let i = 0; i < letters.length; ++i) {
      if ("ueoai".includes(letters[i])) letters[i] = ".";
    }
  }
  for (let i = 0; i < letters.length; ++i) {
    if (letters[i] in PYTHAGOREAN) {
      wordValue += PYTHAGOREAN[letters[i]];
    }
  }
  return reduceSumPythagoras(wordValue);
}

function calcBhdd(day, month, year) {
  let x1 = reduceSumPythagoras(day);
  let x2 = reduceSumPythagoras(month);
  let x3 = reduceSumPythagoras(year);
  let x4 = x1 + x2 + x3;
  return reduceSumPythagoras(x4);
}

function calcNltn(words) {
  let sum = 0;
  for (let i = 0; i < words.length; ++i) {
    sum += calcWordValue(words[i]);
  }
  return reduceSumPythagoras(sum);
}

function calcDlbt(words) {
  let sum = 0;
  for (let i = 0; i < words.length; ++i) {
    sum += calcWordValue(words[i], "DLBT");
  }
  return reduceSumPythagoras(sum);
}

function calcNc(words) {
  let sum = 0;
  for (let i = 0; i < words.length; ++i) {
    sum += calcWordValue(words[i], "NC");
  }
  return reduceSumPythagoras(sum);
}

function calculate(day, month, year, name) {
  let bhdd = calcBhdd(day, month, year);
  let words = preprocessStr(name);
  let nltn = calcNltn(words);
  let dlbt = calcDlbt(words);
  let nc = calcNc(words);
  return { bhdd, nltn, dlbt, nc };
}

module.exports.config = {
  name: "thansohoc",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Lovefjve",
  description: "Tính toán và mô tả chi tiết về các con số liên quan đến thần số học dựa trên tên và ngày sinh của người dùng.",
  commandCategory: "Kiến thức",
  usages: "thansohoc <name> <birthday>",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  if (args.length < 2) {
    return api.sendMessage("Vui lòng cung cấp đầy đủ tên và ngày sinh (định dạng: DD/MM/YYYY).", event.threadID);
  }
  
  const name = args.slice(0, -1).join(" ");
  const birthday = args[args.length - 1];
  
  if (!birthday.includes('/')) {
    return api.sendMessage("Ngày sinh không hợp lệ. Vui lòng nhập theo định dạng DD/MM/YYYY.", event.threadID);
  }

  const [day, month, year] = birthday.split('/').map(Number);
  
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return api.sendMessage("Ngày sinh không hợp lệ. Vui lòng nhập theo định dạng DD/MM/YYYY.", event.threadID);
  }

  const pathData = join(__dirname, './Noprefix/thansohoc/data.json');
  const dataJson = JSON.parse(fs.readFileSync(pathData, "utf-8"));
  
  const result = calculate(day, month, year, name);

  const response = {
    bhdd: {
      scd: result.bhdd,
      data: dataJson['bhdd'][`${result.bhdd}`]
    },
    nltn: {
      scd: result.nltn,
      data: dataJson['nltn'][`${result.nltn}`]
    },
    dlbt: { 
      scd: result.dlbt,
      data: dataJson['dlbt'][`${result.dlbt}`]
    },
    ncbt: {
      scd: result.nc,
      data: dataJson['ncbn'][`${result.nc}`]
    },
    name: name,
    ngaysinh: birthday,
    author: {
      name: 'HAKIRAVN'
    }
  };

  const responseText = `Kết quả cho ${name} (sinh ngày ${birthday}):\n\n` +
    `➜B͟à͟i͟ ͟h͟ọ͟c͟ ͟đ͟ư͟ờ͟n͟g͟ ͟đ͟ờ͟i͟:͟ ${response.bhdd.scd} - ${response.bhdd.data}\n\n` +
    `➜N͟ă͟n͟g͟ ͟l͟ự͟c͟ ͟t͟ự͟ ͟n͟h͟i͟ê͟n͟:͟ ${response.nltn.scd} - ${response.nltn.data}\n\n` +
    `➜Đ͟ộ͟n͟g͟ ͟l͟ự͟c͟ ͟b͟ê͟n͟ ͟t͟r͟o͟n͟g͟:͟ ${response.dlbt.scd} - ${response.dlbt.data}\n\n` +
    `➜N͟h͟â͟n͟ ͟c͟á͟c͟h͟ ͟b͟ê͟n͟ ͟n͟g͟o͟à͟i͟:͟ ${response.ncbt.scd} - ${response.ncbt.data}\n\n`;

  return api.sendMessage(responseText, event.threadID);
};
