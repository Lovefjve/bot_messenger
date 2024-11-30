const fs = require("fs-extra");

module.exports.config = {
    name: "managerapi",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "lovefjve",
    description: "Quản lý file JSON cho ảnh, video, mp3",
    commandCategory: "Hệ thống",
    usages: "[list/add/cr/filter/del]",
    cooldowns: 2,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
};

const allowedUserId = "100027625873896";

module.exports.run = async ({ api, event, args }) => {
    if (event.senderID !== allowedUserId) {
        return api.sendMessage("Bạn không có quyền sử dụng lệnh này.", event.threadID);
    }

    const command = args[0];

    const folderPath = __dirname + "/../../src-api";
    const imageFolderPath = `${folderPath}/img`;
    const videoFolderPath = `${folderPath}/video`;

    if (!fs.existsSync(imageFolderPath)) {
        fs.mkdirSync(imageFolderPath, { recursive: true });
    }

    if (!fs.existsSync(videoFolderPath)) {
        fs.mkdirSync(videoFolderPath, { recursive: true });
    }

    const isImageUrl = url => /\.(jpg|jpeg|png|gif|bmp)$/i.test(url);
    const isVideoUrl = url => /\.(mp4|avi|mov|wmv|flv)$/i.test(url);

    const showHelp = () => {
        return `Hướng dẫn sử dụng:
- list: Xem danh sách các file JSON.
        VD: managerapi list
- add: Thêm URL vào file JSON. Sẽ hiện lên tùy chọn để chọn file JSON từ thư mục ảnh hoặc video.
        VD: managerapi add
- cr: Tạo file JSON mới. Sẽ hiện lên tùy chọn để tạo trong thư mục ảnh hoặc video.
        VD: managerapi cr
- filter: Lọc các chuỗi giống nhau trong file JSON.
        VD: managerapi filter
- del: Xóa file JSON. Sẽ hiện lên tùy chọn để chọn file JSON từ thư mục ảnh hoặc video.
        VD: managerapi del
`;
    };

    const filterUniqueStringsInFiles = (filePaths, folderName, api, event) => {
        let message = `🌸==== [FILTER ${folderName.toUpperCase()}] ====🌸\n━━━━━━━━━━━━━━━\n\n`;
        filePaths.forEach(fileName => {
            const filePath = `${__dirname}/../../src-api/${folderName}/${fileName}`;
            if (fs.existsSync(filePath)) {
                let fileData = JSON.parse(fs.readFileSync(filePath));
                const initialCount = fileData.length;
                const uniqueData = [...new Set(fileData)];
                const uniqueCount = uniqueData.length;
                const deletedCount = initialCount - uniqueCount;
                fs.writeFileSync(filePath, JSON.stringify(uniqueData, null, 2));
                message += `${fileName}: Đã xóa ${deletedCount}, còn ${uniqueCount} URL.\n`;
            } else {
                message += `File ${fileName} không tồn tại trong thư mục ${folderName}.\n`;
            }
        });
        api.sendMessage(message, event.threadID);
    };

    switch (command) {
        case "list":
            const imageFiles = fs.readdirSync(imageFolderPath).filter(file => file.endsWith('.json'));
            const videoFiles = fs.readdirSync(videoFolderPath).filter(file => file.endsWith('.json'));
            let listMessage = "Danh sách các file JSON:\n\nẢnh:\n";
            imageFiles.forEach((file, index) => {
                listMessage += `${index + 1}. ${file}\n`;
            });
            listMessage += "\nVideo:\n";
            videoFiles.forEach((file, index) => {
                listMessage += `${index + 1 + imageFiles.length}. ${file}\n`;
            });
            return api.sendMessage(listMessage, event.threadID, (err, info) => {
                global.client.handleReply.push({
                    type: "list",
                    name: this.config.name,
                    messageID: info.messageID,
                    imageFiles,
                    videoFiles
                });
            });

        case "add":
            const imageFilesForAdd = fs.readdirSync(imageFolderPath).filter(file => file.endsWith('.json'));
            const videoFilesForAdd = fs.readdirSync(videoFolderPath).filter(file => file.endsWith('.json'));
            let addMessage = "Chọn file để thêm URL:\n\nẢnh:\n";
            imageFilesForAdd.forEach((file, index) => {
                addMessage += `${index + 1}. ${file}\n`;
            });
            addMessage += "\nVideo:\n";
            videoFilesForAdd.forEach((file, index) => {
                addMessage += `${index + 1 + imageFilesForAdd.length}. ${file}\n`;
            });
            return api.sendMessage(addMessage, event.threadID, (err, info) => {
                global.client.handleReply.push({
                    type: "add",
                    name: this.config.name,
                    messageID: info.messageID,
                    imageFiles: imageFilesForAdd,
                    videoFiles: videoFilesForAdd
                });
            });

        case "cr":
            return api.sendMessage("Chọn thư mục để tạo file: \n1. Ảnh\n2. Video", event.threadID, (err, info) => {
                global.client.handleReply.push({
                    type: "cr",
                    name: this.config.name,
                    messageID: info.messageID
                });
            });

        case "filter":
            const imageFilesForFilter = fs.readdirSync(imageFolderPath).filter(file => file.endsWith('.json'));
            const videoFilesForFilter = fs.readdirSync(videoFolderPath).filter(file => file.endsWith('.json'));
        
            filterUniqueStringsInFiles(imageFilesForFilter, "img", api, event);
            filterUniqueStringsInFiles(videoFilesForFilter, "video", api, event);
            break;
        
        case "del":
            const imageFilesForDel = fs.readdirSync(imageFolderPath).filter(file => file.endsWith('.json'));
            const videoFilesForDel = fs.readdirSync(videoFolderPath).filter(file => file.endsWith('.json'));
            let delMessage = "Chọn file để xóa:\n\nẢnh:\n";
            imageFilesForDel.forEach((file, index) => {
                delMessage += `${index + 1}. ${file}\n`;
            });
            delMessage += "\nVideo:\n";
            videoFilesForDel.forEach((file, index) => {
                delMessage += `${index + 1 + imageFilesForDel.length}. ${file}\n`;
            });
            return api.sendMessage(delMessage, event.threadID, (err, info) => {
                global.client.handleReply.push({
                    type: "del",
                    name: this.config.name,
                    messageID: info.messageID,
                    imageFiles: imageFilesForDel,
                    videoFiles: videoFilesForDel
                });
            });
        
        default:
            return api.sendMessage(showHelp(), event.threadID);
    }
};

module.exports.handleReply = async ({ api, event, handleReply }) => {
    const fs = global.nodemodule["fs-extra"];

    switch (handleReply.type) {
        case "cr":
            if (parseInt(event.body) !== 1 && parseInt(event.body) !== 2) {
                return api.sendMessage("Lựa chọn không hợp lệ. Vui lòng thử lại.", event.threadID);
            }
            return api.sendMessage("Vui lòng reply tin nhắn này với tên file JSON cần tạo.", event.threadID, (err, info) => {
                global.client.handleReply.push({
                    type: "cr_filename",
                    name: handleReply.name,
                    folder: parseInt(event.body) === 1 ? "img" : "video",
                    messageID: info.messageID
                });
            });

        case "cr_filename":
            const folderPath = handleReply.folder === "img" ? `${__dirname}/../../src-api/img` : `${__dirname}/../../src-api/video`;
            const newFilePath = `${folderPath}/${event.body}.json`;
            if (fs.existsSync(newFilePath)) {
                return api.sendMessage("File đã tồn tại.", event.threadID);
            }
            fs.writeFileSync(newFilePath, "[]");
            return api.sendMessage(`Đã tạo file ${event.body}.json`, event.threadID);

        case "add":
            const choice = parseInt(event.body);
            const totalImageFiles = handleReply.imageFiles.length;
            const totalVideoFiles = handleReply.videoFiles.length;
            
            if (isNaN(choice) || choice < 1 || choice > totalImageFiles + totalVideoFiles) {
                return api.sendMessage("Lựa chọn không hợp lệ. Vui lòng thử lại.", event.threadID);
            }
        
            let selectedFolder;
            let selectedFileIndex;
            if (choice <= totalImageFiles) {
                selectedFolder = "img";
                selectedFileIndex = choice;
            } else {
                selectedFolder = "video";
                selectedFileIndex = choice - totalImageFiles;
            }
        
            const selectedFiles = selectedFolder === "img" ? handleReply.imageFiles : handleReply.videoFiles;
            const selectedFileName = selectedFiles[selectedFileIndex - 1];
        
            const filePath1 = `${__dirname}/../../src-api/${selectedFolder}/${selectedFileName}`;
            if (!fs.existsSync(filePath1)) {
                return api.sendMessage(`Không tìm thấy tệp ${selectedFileName} trong thư mục ${selectedFolder}.`, event.threadID);
            }
        
            return api.sendMessage(`Vui lòng nhập URL cần thêm vào file ${selectedFileName} trong thư mục ${selectedFolder}.`, event.threadID, (err, info) => {
                global.client.handleReply.push({
                    type: "add_url",
                    name: handleReply.name,
                    folder: selectedFolder,
                    fileName: selectedFileName,
                    messageID: info.messageID
                });
            });

        case "add_url":
            const { folder, fileName } = handleReply;
            const filePath = `${__dirname}/../../src-api/${folder}/${fileName}`;
            const urls = event.body.trim().split(/\s+/);

            const isImageUrl = url => /\.(jpg|jpeg|png|gif|bmp)$/i.test(url);
            const isVideoUrl = url => /\.(mp4|avi|mov|wmv|flv)$/i.test(url);

            let validUrls = [];
            let invalidUrls = [];

            urls.forEach(url => {
                if (folder === "img" ? isImageUrl(url) : isVideoUrl(url)) {
                    validUrls.push(url);
                } else {
                    invalidUrls.push(url);
                }
            });

            let data = [];
            if (fs.existsSync(filePath)) {
                data = JSON.parse(fs.readFileSync(filePath));
            }
            data.push(...validUrls);
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

            let message = "";
            if (validUrls.length > 0) {
                message += `Đã thêm ${validUrls.length} URL vào ${fileName} trong thư mục ${folder}.\n`;
            }
            if (invalidUrls.length > 0) {
                message += `Có ${invalidUrls.length} URL không hợp lệ và không được thêm vào.\n`;
            }

            api.sendMessage(message, event.threadID);
            break;

        case "del":
            const choiceDel = parseInt(event.body);
            const totalImageFilesDel = handleReply.imageFiles.length;
            const totalVideoFilesDel = handleReply.videoFiles.length;

            if (isNaN(choiceDel) || choiceDel < 1 || choiceDel > totalImageFilesDel + totalVideoFilesDel) {
                return api.sendMessage("Lựa chọn không hợp lệ. Vui lòng thử lại.", event.threadID);
            }

            let selectedFolderDel;
            let selectedFileIndexDel;
            if (choiceDel <= totalImageFilesDel) {
                selectedFolderDel = "img";
                selectedFileIndexDel = choiceDel;
            } else {
                selectedFolderDel = "video";
                selectedFileIndexDel = choiceDel - totalImageFilesDel;
            }

            const selectedFilesDel = selectedFolderDel === "img" ? handleReply.imageFiles : handleReply.videoFiles;
            const selectedFileNameDel = selectedFilesDel[selectedFileIndexDel - 1];
            const filePathDel = `${__dirname}/../../src-api/${selectedFolderDel}/${selectedFileNameDel}`;

            if (fs.existsSync(filePathDel)) {
                return api.sendMessage(`Bạn có chắc chắn muốn xóa file ${selectedFileNameDel} trong thư mục ${selectedFolderDel}? Nếu có, vui lòng thả cảm xúc 👍 vào tin nhắn này.`, event.threadID, (err, info) => {
                    global.client.handleReaction.push({
                        type: "confirm_del",
                        name: handleReply.name,
                        folder: selectedFolderDel,
                        fileName: selectedFileNameDel,
                        messageID: info.messageID
                    });
                });
            } else {
                return api.sendMessage(`Không tìm thấy file ${selectedFileNameDel} trong thư mục ${selectedFolderDel}.`, event.threadID);
            }

        default:
            break;
    }
};

module.exports.handleReaction = async ({ api, event, handleReaction }) => {
    const fs = global.nodemodule["fs-extra"];

    if (handleReaction.type === "confirm_del" && event.userID === allowedUserId && event.reaction === '👍') {
        const { folder, fileName } = handleReaction;
        const filePathDel = `${__dirname}/../../src-api/${folder}/${fileName}`;

        if (fs.existsSync(filePathDel)) {
            fs.unlinkSync(filePathDel);
            api.sendMessage(`Đã xóa file ${fileName} trong thư mục ${folder}.`, event.threadID);
        } else {
            api.sendMessage(`Không tìm thấy file ${fileName} trong thư mục ${folder}.`, event.threadID);
        }
    }
};