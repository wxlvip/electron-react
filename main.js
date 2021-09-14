const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
// Electron使用IPC（interprocess communication）在进程之间进行通讯
function createWindow () {
    // require('devtron').install();
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true
        }
    })
    mainWindow.webContents.openDevTools();
    // mainWindow.loadFile('index.html')
    // 通过路径加载应用----适用于 react 项目
    const urlLocation = isDev ? 'http://localhost:3000' : 'https://www.wxlvip.com';
    mainWindow.loadURL(urlLocation);
    // ipcMain.on("message",(event,arg)=>{
    //     console.log(arg);
    //     event.reply('reply','主线程给你回信了，笔芯呦！' + new Date());
    // });
    
    // 创建子窗口
    // const otherWindow = new BrowserWindow({
    //     width: 300,
    //     height: 200,
    //     webPreferences: {
    //         preload: path.join(__dirname, 'preload.js')
    //     },
    //     parent:mainWindow
    // })
    //
    // otherWindow.loadFile('two.html')
}

// 部分 API 在 ready 事件触发后才能使用。 // 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.whenReady().then(() => {
    // require('devtron').install();
    createWindow()
    //如果没有窗口打开则打开一个窗口 (macOS) macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 关闭所有窗口时退出应用 (Windows & Linux)
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
