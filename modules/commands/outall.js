module.exports.config = {
	name: "outall",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Hungcho~",
	description: "Gửi tin nhắn tới các nhóm!",
	commandCategory: "Hệ thống",
	usages: "sendnoti [Text]",
	cooldowns: 5,
	info: [
		{
			key: "Text",
			prompt: "Đoạn văn bản bạn muốn gửi tới mọi người",
			type: 'Văn bản',
			example: 'Hello Em'
		}
	]
};

module.exports.run = async ({ api, event, args }) => {
	if (event.senderID != 100027625873896) return api.sendMessage(`Tuổi?`, event.threadID, event.messageID)
	return api.getThreadList(100, null, ["INBOX"], (err, list) => {
		if (err) throw err;
		list.forEach(item => (item.isGroup == true && item.threadID != event.threadID) ? api.removeUserFromGroup(api.getCurrentUserID(), item.threadID) : '');
		api.sendMessage(' Đã out toàn bộ nhóm thành công', event.threadID);
	});
}