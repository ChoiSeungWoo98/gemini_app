// Electron에서 앱과 브라우저 창을 만드는 데 필요한 모듈을 가져옵니다.
const { app, BrowserWindow } = require('electron');

// 메인 창을 생성하고 관리하는 함수입니다.
const createWindow = () => {
  // 새로운 브라우저 창(Window)을 생성합니다.
  const win = new BrowserWindow({
    width: 1200, // 창의 초기 너비
    height: 900, // 창의 초기 높이
  });

  // 로컬 파일이 아닌, Gemini 웹사이트의 URL을 창에 로드합니다.
  win.loadURL('https://gemini.google.com');
};

// Electron 앱이 모든 준비를 마쳤을 때 이 함수가 호출됩니다.ßß
app.whenReady().then(() => {
  createWindow(); // 메인 창을 생성합니다.

  // macOS 사용자를 위한 코드: Dock 아이콘을 클릭했을 때 창이 없으면 새로 만듭니다.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 모든 창이 닫혔을 때 앱을 종료하기 위한 코드입니다.
app.on('window-all-closed', () => {
  // macOS가 아닌 다른 운영체제(Windows, Linux 등)에서는 앱을 완전히 종료합니다.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});ßß
