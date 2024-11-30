module.exports.config = {
  name: "topbox",
  version: "1.1.1",
  hasPermssion: 0,
  credits: "DC-Nam",
  description: "Xem top money, level trong nhóm",
  commandCategory: "Thống kê",
  usages: "[money|level] + num, không có num mặc định sẽ là 10",
  cooldowns: 0
}
module.exports.languages = {
  "vi": {},
  "en": {}
}
module.exports.run = async ({
  api: a,
  event: e,
  args: g,
  Currencies: C,
  Users: U
}) => {
  var {
    threadID: t,
    messageID: m,
    senderID: s,
    participantIDs: pI
  } = e, array = [], newArr = [], msg = ""
  const allType = ["money", "level"]
  if (!allType.includes(g[0]) || !g[0]) return a.sendMessage(`[😽]➜ Vui lòng chọn money|level muốn xem`, t, m)
  if (g[1] && isNaN(g[1])) return a.sendMessage(`[😽]➜ Phải là 1 con số`, t, m)
  switch (g[0]) {
    case "money": {
      await FOD("money", "m")
      array.sort(VC("m"))
      FO("m")
      msg = `[😽]➜ Bảng xếp hạng đại gia trong nhóm ←[😽]\n\n`.toUpperCase()
      FF("Money", "m")
      FI("money", "i", "m")
      a.sendMessage(msg, t, m)
    }
    break
  case "level": {
    await FOD("exp", "e")
    array.sort(VC("e"))
    FO("e")
    msg = `[😽]➜ Bảng xếp hạng level trong nhóm ←[😽]\n\n`.toUpperCase()
    FF("Level", "e")
    FI("level", "i", "e")
    a.sendMessage(msg, t, m)
  }
  break
  }
  function FF(t1, t2) {
    for (var i in newArr) {
      msg += `${i < 4 ? ICON(i) : parseInt(i) + "."} ${newArr[i].n}\n » ${t1}: ${t2 == "m" ? CC(newArr[i][t2]) : LV(newArr[i][t2])}\n`
      if ((i == parseInt(g[1]) - 1 && i < newArr.length) || i == 9) break
    }
  }
  async function FOD(k, m) {
    for (const id of pI) {
      let mU = (await C.getData(id))[k] || 0
      let nU = (await U.getData(id)).name || ""
      array.push({
        i: id,
        n: nU,
        [m]: mU
      })
    }
  }
  function FO(k) {
    for (var i in array) {
      newArr.push({
        i: parseInt(i) + 1,
        id: array[i].i,
        n: array[i].n,
        [k]: array[i][k]
      })
    }
  }
  function FI(k, i, x) {
    let find = newArr.find(i => i.id == s)
    msg += TX(find[i], k, find[x])
  }
}
function CC(n) {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: 2
  })
}
function VC(k) {
  return function(a, b) {
    let i = 0;
    if (a[k] > b[k]) {
      i = 1
    } else if (a[k] < b[k]) {
      i = -1
    }
    return i * -1
  }
}
function LV(x) {
  return Math.floor((Math.sqrt(1 + (4 * x) / 3) + 1) / 2)
}
function ICON(i) {
  return i == 0 ? "🏆" : i == 1 ? "🥇" : i == 2 ? "🥈" : i == 3 ? "🥉" : ""
}
function TX(x, k, c) {
  return `\n[👉]➜ ${k} của bạn là ${k == "money" ? CC(c) + "$" : LV(c)} và đang đứng top ${x}\n[😽]➜ ${x == 1 ? `Bạn đang vô địch, thật vip pro` : `${x > 20 ? `[😽]➜ Bạn đứng top ${x > 20 && x < 30 ? `khá thấp` : x > 30 && x < 50 ? `rất thấp` : `rất rất thấp`}!, cố gắng cày ${k} đi nhé` : x > 10 && x < 20 ? `[😽]➜ Sắp lọt top 10 rồi cố gắng lên!!` : `Bạn có trong top 10, cố gắng giữ phong độ nhé!`}`}`
}