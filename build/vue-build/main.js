const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
// 获取指定加载路径
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:8080`
    : path.join("file://", __dirname, 'index.html')

function createWindow() {
    // 创建浏览器窗口
    const win = new BrowserWindow({
        width: 800,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    })
    // 菜单模板设置
    let template = [
        {
            label: '帮助',
            submenu: [
                {
                    label: '控制台',
                    click: () => {
                        win.webContents.openDevTools({mode: 'bottom'})
                    }
                },
                {label: '关于'}
            ]
        }
    ]
    // 加载菜单
    let m = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(m)

    // 修改为加载 Vue 服务地址
    win.loadURL(winURL);

    // 打开开发者工具
    // win.webContents.openDevTools()
}


// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow)

//当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// 您可以把应用程序其他的流程写在在此文件中
// 代码 也可以拆分成几个文件，然后用 require 导入。
