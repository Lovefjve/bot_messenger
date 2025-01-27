module.exports.config = {
	name: "cuoptien",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Là cướp đó",
	commandCategory: "Game",
	usages: "cuoptien",
	cooldowns: 5
};

module.exports.run = async function({ api, event, Users, Currencies }) {
	try {
		const { threadID, senderID } = event;

		// Lấy thông tin nhóm
		const threadInfo = await api.getThreadInfo(threadID);

		// Lọc ra danh sách các thành viên (loại bỏ bot hiện tại)
		const members = threadInfo.participantIDs.filter(id => id !== api.getCurrentUserID());

		// Chọn ngẫu nhiên một người dùng làm nạn nhân
		const victim = members[Math.floor(Math.random() * members.length)];
		const nameVictim = (await Users.getData(victim)).name;

		if (victim == api.getCurrentUserID() && event.senderID == victim) {
			return api.sendMessage('→ Rất tiếc, bạn không thể ăn cắp từ người này. Vui lòng thử lại.', event.threadID, event.messageID);
		}

		var route = Math.floor(Math.random() * 2);
		if (route > 1 || route == 0) {
			const moneydb = (await Currencies.getData(victim)).money;
			const money = Math.floor(Math.random() * 1000) + 1;

			if (moneydb <= 0 || moneydb == undefined) {
				return api.sendMessage(`→ Bạn vừa ăn cắp ${nameVictim} là một người nghèo. Vì vậy, bạn không có gì`, event.threadID, event.messageID);
			} else if (moneydb >= money) {
				return api.sendMessage(`→ Bạn vừa lấy trộm ${money} đô từ ${nameVictim} trong nhóm này`, event.threadID, async () => {
					await Currencies.increaseMoney(victim, parseInt("-" + money));
					await Currencies.increaseMoney(event.senderID, parseInt(money));
				}, event.messageID);
			} else if (moneydb < money) {
				return api.sendMessage(`→ Bạn vừa ăn cắp tất cả ${moneydb} số dư của ${nameVictim} trong nhóm này`, event.threadID, async () => {
					await Currencies.increaseMoney(victim, parseInt("-" + money));
					await Currencies.increaseMoney(event.senderID, parseInt(money));
				}, event.messageID);
			}
		} else if (route == 1) {
			const name = (await Users.getData(event.senderID)).name;
			const moneyuser = (await Currencies.getData(event.senderID)).money;

			if (moneyuser <= 0) {
				return api.sendMessage("→ Bạn không có tiền, HÃY LÀM VIỆC ĐỂ CÓ ĐƯỢC MỘT SỐ TIỀN LÀM VỐN.", event.threadID, event.messageID);
			} else if (moneyuser > 0) {
				return api.sendMessage(`→ Bạn đã bị bắt và mất ${moneyuser} đô.`, event.threadID, () => {
					api.sendMessage({
						body: `→ Xin chúc mừng  ${nameVictim}! Bạn đã bắt được ${name} và nhận được ${Math.floor(moneyuser / 2)} đô làm phần thưởng!`,
						mentions: [{ tag: nameVictim, id: victim }, { tag: name, id: event.senderID }]
					}, event.threadID, async () => {
						await Currencies.increaseMoney(event.senderID, parseInt("-" + moneyuser));
						await Currencies.increaseMoney(victim, parseInt(Math.floor(moneyuser / 2)));
					});
				}, event.messageID);
			}
		}
	} catch (error) {
		console.error(error);
		api.sendMessage("Đã xảy ra lỗi khi xử lý yêu cầu của bạn.", event.threadID, event.messageID);
	}
};
