const {BrowserWindow, app} = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width:1200,
        height: 800,
        backgroundColor: "white",
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('index.html')
}

app.whenReady().then(createWindow)