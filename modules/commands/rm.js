const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
    name: "rm",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "lovefjve",
    description: "Xóa các URL dựa trên tên định dạng từ các tệp JSON trong thư mục và các thư mục con và in ra thông báo.",
    commandCategory: "Other",
    usages: "rm +<tên định dạng> +<url1(bỏ tên định dạng)> <url2> ...",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
    if (!args[0] || !args[1]) {
        return api.sendMessage(`Bạn cần cung cấp đầy đủ đối số cho lệnh. Sử dụng: rm +<tên định dạng> +<url1(bỏ tên định dạng)> <url2> ...`, event.threadID);
    }

    const formatName = args[0].toLowerCase(); // Lấy tên định dạng từ đối số đầu tiên
    const urls = args.slice(1); // Lấy danh sách các URL từ đối số thứ hai trở đi

    const baseDir = path.join(__dirname, '../../src-api'); // Thư mục gốc chứa các tệp JSON
    let deletionMessages = [];

    try {
        // Hàm đệ quy để duyệt qua các tệp JSON trong thư mục và các thư mục con
        const processFiles = async (dir) => {
            const files = await fs.readdir(dir);

            for (const file of files) {
                const filePath = path.join(dir, file);
                const stat = await fs.lstat(filePath);

                if (stat.isDirectory()) {
                    await processFiles(filePath); // Nếu là thư mục, đệ quy để duyệt tiếp
                } else if (file.endsWith('.json')) {
                    try {
                        let fileData = await fs.readJson(filePath);

                        const initialCount = fileData.length;

                        // Lọc và xóa các URL theo định dạng và danh sách các URL đã cung cấp
                        fileData = fileData.filter(url => {
                            if (url.toLowerCase().includes(formatName)) {
                                const urlWithoutFormat = url.replace(`.${formatName}`, ''); // Bỏ tên định dạng khỏi URL
                                return !urls.includes(urlWithoutFormat); // Trả về false để loại bỏ khỏi mảng nếu URL có tồn tại trong danh sách urls
                            }
                            return true; // Giữ lại các URL không khớp với định dạng
                        });

                        await fs.writeJson(filePath, fileData, { spaces: 2 });

                        const validCount = fileData.length;
                        const deletedCount = initialCount - validCount;

                        // Tạo thông báo về việc xóa URL và lưu vào mảng
                        if (deletedCount > 0) {
                            deletionMessages.push(`Đã xóa ${deletedCount} URL từ tệp ${file} trong thư mục ${path.relative(baseDir, dir)}.`);
                        }
                    } catch (error) {
                        console.error(`Lỗi khi xử lý tệp ${file} trong thư mục ${path.relative(baseDir, dir)}:`, error);
                    }
                }
            }
        };

        await processFiles(baseDir); // Bắt đầu duyệt từ thư mục gốc

        // Gửi các thông báo về việc xóa URL
        if (deletionMessages.length > 0) {
            api.sendMessage(`🗑️==== [DELETION REPORT] ====🗑️\n━━━━━━━━━━━━━━━━━\n\n${deletionMessages.join("\n")}`, event.threadID);
        } else {
            api.sendMessage("Không có URL nào được xóa.", event.threadID);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("Đã xảy ra lỗi khi thực hiện lệnh.", event.threadID);
    }
};
