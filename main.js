'use strict';

const { app, BrowserWindow } = require('electron')
require('./server.js');

require('electron-reload')(__dirname);

function createWindow () {
  // Crea la ventana del navegador.
  let win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // y carga el  index.html de la aplicación.
  win.loadFile('public/pics.html')
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow)