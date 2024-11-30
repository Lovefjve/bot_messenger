module.exports.config = {
	name: "rank",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Siêu Đáng Yêu",
	description: "Lấy rank hiện tại của bạn trên hệ thống bot",
	commandCategory: "User",
	cooldowns: 5,
	dependencies: {
		"fs-extra": "",
		"path": "",
		"node-superfetch": ""
	}
};

module.exports.expToLevel = (point) => {
	if (point < 0) return 0;
	return Math.floor((Math.sqrt(1 + (4 * point) / 3) + 1) / 2);
}

module.exports.levelToExp = (level) => {
	if (level <= 0) return 0;
	return 3 * level * (level - 1);
}

module.exports.getInfo = async (uid, Currencies) => {
	let point = (await Currencies.getData(uid)).exp;
	const level = this.expToLevel(point);
	const expCurrent = point - this.levelToExp(level);
	const expNextLevel = this.levelToExp(level + 1) - this.levelToExp(level);
	return { level, expCurrent, expNextLevel };
}

module.exports.makeRankMessage = async (data) => {
	const { id, name, rank, level, expCurrent, expNextLevel } = data;
	return `💟 Tên: ${name}\n🏆 Top: ${rank}\n💌 Level: ${level} 🌟\nEXP hiện tại: ${expCurrent}/${expNextLevel}`;
}

module.exports.onLoad = async function () {
	const { resolve } = global.nodemodule["path"];
	const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
	const { downloadFile } = global.utils;
	const path = resolve(__dirname, "cache", "customrank");
	if (!existsSync(path)) mkdirSync(path, { recursive: true });
	// Tải về các tệp cần thiết nếu chưa tồn tại
	if (!existsSync(resolve(__dirname, 'cache', 'regular-font.ttf'))) await downloadFile("https://raw.githubusercontent.com/catalizcs/storage-data/master/rank/fonts/regular-font.ttf", resolve(__dirname, 'cache', 'regular-font.ttf'));
	if (!existsSync(resolve(__dirname, 'cache', 'bold-font.ttf'))) await downloadFile("https://raw.githubusercontent.com/catalizcs/storage-data/master/rank/fonts/bold-font.ttf", resolve(__dirname, 'cache', 'bold-font.ttf'));
	if (!existsSync(resolve(__dirname, 'cache', 'rankcard.png'))) await downloadFile("https://raw.githubusercontent.com/catalizcs/storage-data/master/rank/rank_card/rankcard.png", resolve(__dirname, 'cache', 'rankcard.png'));
}

module.exports.run = async function ({ event, api, Currencies, Users }) {
	const fs = global.nodemodule["fs-extra"];
	let dataAll = await Currencies.getAll(["userID", "exp"]);
	dataAll.sort((a, b) => b.exp - a.exp);

	const name = global.data.userName.get(event.senderID) || await Users.getNameUser(event.senderID);
	const listUserID = event.participantIDs;
	let expList = [];
	for (const idUser of listUserID) {
		const userExp = await Currencies.getData(idUser) || { exp: 0 };
		expList.push({ name: idUser.name, exp: userExp.exp, uid: idUser });
	}
	expList.sort((a, b) => b.exp - a.exp);
	const rank = expList.findIndex(info => parseInt(info.uid) === parseInt(event.senderID)) + 1;
	const infoUser = expList[rank - 1];

	if (rank === 0) {
		return api.sendMessage("Bạn hiện không có trong cơ sở dữ liệu nên không thể thấy thứ hạng của mình, vui lòng thử lại sau 5 giây.", event.threadID, event.messageID);
	}

	const point = await this.getInfo(event.senderID, Currencies);
	let rankMessage = await this.makeRankMessage({ id: event.senderID, name, rank, ...point });

	return api.sendMessage({ body: rankMessage }, event.threadID, event.messageID);
}
