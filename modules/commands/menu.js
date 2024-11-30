module.exports.config = {
    name: 'menu',
    version: '1.1.1',
    hasPermssion: 0,
    credits: 'DC-Nam mod by quất',
    description: 'Xem danh sách nhóm lệnh, thông tin lệnh',
    commandCategory: 'User',
    usages: '[...name commands|all]',
    cooldowns: 5,
    // seconds
    envConfig: {
        autoUnsend: {
            status: true,
            //
            timeOut: 60 // seconds
        },
        sendAttachments: {
            status: false,
            // bật/tắt gửi kèm tệp
            random: false,
            // tắt random ảnh thì gắn link ảnh bên dưới, bật thì vào home/modules/commands/cache/imagesMenu.json thêm link ảnh
            url: 'https://i.ibb.co/T4Zr0sy/z3692132602050-019d89d029ccca04d6316004ac015531.jpg'
        }
    }
};
const {
    autoUnsend = this.config.envConfig.autoUnsend,
    sendAttachments = this.config.envConfig.sendAttachments
} = global.config == undefined ? {}: global.config.menu == undefined ? {}: global.config.menu;
const {
    compareTwoStrings,
    findBestMatch
} = require('string-similarity');
const {
    readFileSync,
    writeFileSync,
    existsSync
} = require('fs-extra');
module.exports.onLoad = function() {
    const dir = __dirname + '/cache/';
    if (!existsSync(dir + 'imagesMenu.json')) writeFileSync(dir + 'imagesMenu.json', '[]');
};
module.exports.run = async function({
    api, event, args
}) {
    const {
        sendMessage: send,
        unsendMessage: un
    } = api;
    const {
        threadID: tid,
        messageID: mid,
        senderID: sid
    } = event;
    const cmds = global.client.commands;
    if (args.length >= 1) {
        if (typeof cmds.get(args.join(' ')) == 'object') {
            const body = infoCmds(cmds.get(args.join(' ')).config);
            const msg = sendAttachments.status ? {
                body,
                attachment: await images()}: body;
            return send(msg, tid, mid);
        } else {
            if (args[0] == 'all') {
                const data = cmds.values();
                var txt = ' ━━━━━━━━━[ TỔNG LỆNH ]━━━━━━━━━ \n',
                count = 0;
                for (const cmd of data) txt += `${++count}. ${cmd.config.name}\n➜ ${cmd.config.description}\n`;
                const msg = sendAttachments.status ? {
                    body: txt,
                    attachment: await images()}: txt;
                send(msg, tid, (a, b) => autoUnsend.status ?setTimeout(v1 => un(v1), 1000*autoUnsend.timeOut, b.messageID): '');
            } else {
                const cmdsValue = cmds.values();
                const arrayCmds= [];
                for (const cmd of cmdsValue) arrayCmds.push(cmd.config.name);
                const similarly = findBestMatch(args.join(' '), arrayCmds);
                if (similarly.bestMatch.rating >= 0.3) return send(`➜ Không có lệnh "${args.join(' ')}"\n➜ Lệnh gần giống là "${similarly.bestMatch.target}" ?`, tid, mid);
                  /*for (const cmd of cmdsValue) if (compareTwoStrings(args.join(' '), cmd.config.name) >= 0.3) return send(`➜ Không có lệnh "${args.join(' ')}"\n➜ Lệnh gần giống là "${cmd.config.name}" ?`, tid, mid);*/
            };
        };
    } else {
        const data = commandsGroup();
        var txt = ' ━━━━━[ Menu ]━━━━━ \n\n',
        count = 0;
        for (const {
            commandCategory,
            commandsName
        } of data) txt += `${++count}. ${commandCategory} | ${commandsName.length} lệnh.\n`;
        txt += `\n━━━━━━━━━━━━━━\n➩ Hiện có: ${global.client.commands.size} lệnh\n➩ Reply từ 1 đến ${data.length} để chọn\n➩ Facebook: https://www.facebook.com/hieukks\n━━━━━━━━━━━━━━\n=== 『 Lovefjve 』 ===`;
        const msg = sendAttachments.status ? {
            body: txt,
            attachment: await images()}: txt;
        send(msg, tid, (a, b) => {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: b.messageID,
                author: sid,
                'case': 'infoGr',
                data
            });
            if (autoUnsend.status) setTimeout(v1 => un(v1), 1000*autoUnsend.timeOut, b.messageID);
        });
    };
};
module.exports.handleReply = async function({
    handleReply: $,
    api,
    event
}) {
    const {
        sendMessage: send,
        unsendMessage: un
    } = api;
    const {
        threadID: tid,
        messageID: mid,
        senderID: sid,
        args
    } = event;
    if (sid != $.author) {
        const msg = sendAttachments.status ? {
            body: `Đi ra chỗ khác chơi 🥹`,
            attachment: await images()}: `Đi ra chỗ khác chơi 🥹`;
        return send(msg, tid, mid);
    };
    switch ($.case) {
        case 'infoGr': {
            var data = $.data[(+args[0])-1];
            if (data == undefined) {
                const txt = `➩ ${args[0]} không nằm trong số thứ tự menu`;
                const msg = sendAttachments.status ? {
                    body: txt,
                    attachment: await images()}: txt;
                return send(msg, tid, mid);
            };
            un($.messageID);
            var txt = ' ━━━━━━ ' + data.commandCategory + ' ━━━━━━ \n\n',
            count = 0;
            for (const name of data.commandsName) txt += `${++count}. ${name}\n`;
            txt += `\n━━━━━━━━━━━━━━━━━━━━━\n➩ Hiện có: ${global.client.commands.size} lệnh\n➩ Reply từ 1 đến ${data.commandsName.length} để chọn\n➩ Facebook:https://www.facebook.com/hieukks\n━━━━━━━━━━━━━━━━━━━━━\n=== 『 Lovefjve 』 ===`;
            const msg = sendAttachments.status ? {
                body: txt,
                attachment: await images()}: txt;
            send(msg, tid, (a, b) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: b.messageID,
                    author: sid,
                    'case': 'infoCmds',
                    data: data.commandsName
                });
                if (autoUnsend.status) setTimeout(v1 => un(v1), 1000*autoUnsend.timeOut, b.messageID);
            });
        };
            break;
        case 'infoCmds': {
            var data = global.client.commands.get($.data[(+args[0])-1]);
            if (typeof data != 'object') {
                const txt = `➩ ${args[0]} không nằm trong số thứ tự menu`;
                const msg = sendAttachments.status ? {
                    body: txt,
                    attachment: await images()}: txt;
                return send(msg, tid, mid);
            };; const {
                config = {}
            } = data || {};
            un($.messageID);
            const msg = sendAttachments.status ? {
                body: infoCmds(config),
                attachment: await images()}: infoCmds(config);
            send(msg,
                tid,
                mid);
        };
            break;
        default:
            // code
        }
    };
    function commandsGroup() {
        const array = [],
        cmds = global.client.commands.values();
        for (const cmd of cmds) {
            const {
                name,
                commandCategory
            } = cmd.config;
            const find = array.find(i => i.commandCategory == commandCategory)
            !find ? array.push({
                commandCategory,
                commandsName: [name]
            }): find.commandsName.push(name);
        };
        array.sort(sortCompare('commandsName'));
        return array;
    };
    async function images() {
        const data = JSON.parse(readFileSync(__dirname + '/cache/imagesMenu.json'));
        const url = sendAttachments.random ? (data.length == 0 ? sendAttachments.url: data[Math.floor(Math.random()*data.length)]): sendAttachments.url;
        return (await require('axios')({
            url,
            method: 'GET',
            responseType: 'stream',
        })).data;
    };
    function infoCmds(a) {
        return ` ━━━━━━━ ${a.name} ━━━━━━━ \n\n➜ Phiên bản : ${a.version}\n➜ Quyền hạn : ${premssionTxt(a.hasPermssion)}\n➜ Tác giả : ${a.credits}\n➜ Mô tả : ${a.description}\n➜ Thuộc nhóm : ${a.commandCategory}\n➜ Cách dùng : ${a.usages}\n➜ Thời gian chờ : ${a.cooldowns} giây\n\n━━━━━━━━━━━━━━━━━━━━━\n=== 『 Lovefjve 』 ===`;
    };
    function premssionTxt(a) {
        return a == 0 ? 'Thành Viên': a == 1 ? 'Quản Trị Viên Nhóm': a == 2 ? 'Người Điều Hành Bot': 'ADMINBOT';
    };
    function prefix(a) {
        const tidData = global.data.threadData.get(a) || {};
        return tidData.PREFIX || global.config.PREFIX;
    };
    function sortCompare(k) {
        return function(a, b) {
            return (a[k].length > b[k].length ? 1: a[k].length < b[k].length ? -1: 0)*-1;
        };
    };
