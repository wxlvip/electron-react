const fs = window.require('fs').promises;
// const path = require('path');


const FileHelper = {
    // 读取文件
    readFile:(path) => {
        return fs.readFile(path,{encoding: 'utf8'});
    },
    // 写入文件
    writeFile:(path, content) => {
        return fs.writeFile(path, content, {encoding: 'utf8'});
    },
    // 重命名文件
    renameFile:(path, newPath) => {
        return fs.rename(path, newPath);
    },
    // 删除文件
    deleteFile:(path) => {
        return fs.unlink(path);
    }    
}

// const testPath = path.join(__dirname, 'helper.js');
// const testWritePath = path.join(__dirname, 'hellow.md');
// FileHelper.readFile(testPath).then((data) => {
//     console.log(data);
// });
// FileHelper.writeFile(testWritePath, '## 你好，世界me！').then(() => {
//     console.log('写入成功le');
// });
export default FileHelper;