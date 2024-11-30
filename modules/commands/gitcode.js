module.exports.config = {
    name: "gitcode",
    version: "1.1.1",
    hasPermssion: 2,
    credits: "Quất",
    description: "Tạo code nhận xu",
    commandCategory: "Admin",
    usages: "[list | <code>/<number>/<money>]",
    cooldowns: 3,
};

const path = __dirname + '/data/code.json';
const fs = require("fs");

// Hướng dẫn sử dụng lệnh
// Lệnh 'gitcode list' sẽ liệt kê tất cả các mã code hiện có
// Lệnh 'gitcode <code>/<number>/<money>' sẽ tạo một mã code mới với số lần nhập và số tiền tương ứng

module.exports.handleEvent = async function ({ api, event, args, Currencies }) {
    try {
        const { increaseMoney, decreaseMoney, getData } = Currencies;
        if (!event.body) return;
        
        var data = JSON.parse(fs.readFileSync(path));
        if (data.length > 0) {
            const findCode = data.find(item => item.key === (event.body).toLowerCase());
            if (findCode) {
                const findU = findCode.user.find(item => item.userID === event.senderID);
                if (findU) {
                    return api.sendMessage('Bạn đã nhập code trước đó\n Mỗi code chỉ được nhập 1 lần.', event.threadID);
                }
                await increaseMoney(event.senderID, findCode.money);
                api.sendMessage(`📌 Xin chúc mừng bạn đã nhập được mã code từ admin [ ${findCode.key} ] bạn nhận được ${findCode.money}$\n Tiền sẽ được cộng trực tiếp vào tk của bạn, hãy dùng lệnh money để kiểm tra!`, event.threadID);
                findCode.number--;
                findCode.user.push({
                    userID: event.senderID
                });
                if (findCode.number <= 0) {
                    api.sendMessage(`❎ Code: ${findCode.key}\nTrạng thái: Đã hết lượt nhập!\n📝 Tự động xóa code khỏi dữ liệu`, event.threadID);
                    data = data.filter(item => item.key !== findCode.key);
                }
            }
            fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
        }
    } catch (e) {
        console.log(e);
    }
};

module.exports.run = async function ({ api, event, args }) {
    try {
        var data = JSON.parse(fs.readFileSync(path));
        const { ADMINBOT } = global.config;
        const ar = args[0];

        if (!ar) {
            return api.sendMessage("Thiếu tham số đầu vào.", event.threadID);
        }

        if (ar === "list") {
            let msg = [];
            for (let i = 0; i < data.length; i++) {
                msg.push("==================");
                msg.push(`🗡 Code: ${data[i].key}`);
                msg.push(`🥑 Được nhập: ${data[i].number}`);
                msg.push(`💸 Quà: ${data[i].money}$`);
            }
            msg.push("==================");
            return api.sendMessage(`==[ ALL CODE ]==\n${msg.join("\n")}\n⚜ Chat code lên để nhập code, số lượng có hạn nhé 🥰\nAdmin chúc các bạn sử dụng bot vui vẻ!!!`, event.threadID);
        }

        const code = ar.split("/");
        if (code.length !== 3) {
            return api.sendMessage("Tham số không hợp lệ! Định dạng đúng là: <code>/<number>/<money>", event.threadID);
        }

        const key = code[0].toLowerCase();
        const number = parseInt(code[1]);
        const money = parseInt(code[2]);

        if (isNaN(number) || isNaN(money)) {
            return api.sendMessage("Số lần nhập và số tiền phải là số nguyên.", event.threadID);
        }

        const findC = data.find(item => item.key === key);
        if (findC) {
            return api.sendMessage('Code này đã có trong data', event.threadID);
        }

        var dcode = { key: key, number: number, money: money, user: [] };
        data.push(dcode);
        fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
        return api.sendMessage(`🔰 Tạo code thành công\n📝 Code: ${key}\n📌 Số lần nhập: ${number}\n💸 Số tiền: ${money}\n Hãy nhập code ${key} để được ${money}$ nhé `, event.threadID);

    } catch (e) {
        console.log(e);
    }
};
