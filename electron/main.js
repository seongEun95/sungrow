const { app, BrowserWindow, shell, ipcMain, protocol, net } = require('electron');
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');

// 개발 모드 여부
const isDev = process.env.NODE_ENV === 'development';

// out/ 폴더 절대 경로
const OUT_DIR = path.join(__dirname, '../out');

// ─────────────────────────────────────────────────────────
// 커스텀 프로토콜 등록 (app://) — file:// 절대경로 문제 해결
// Next.js 정적 빌드의 /_next/... 절대 경로를 올바르게 서빙
// ─────────────────────────────────────────────────────────
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      standard: true,    // /_next/... 같은 경로를 오리진 기준으로 해석
      secure: true,       // HTTPS와 동일하게 취급
      supportFetchAPI: true,
      corsEnabled: true,
    },
  },
]);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 600,
    title: 'PMS Dashboard',
    backgroundColor: '#0f1117',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
    show: false, // 준비될 때까지 숨겨두기 (흰 화면 깜빡임 방지)
    icon: path.join(__dirname, '../public/favicon.ico'),
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  if (isDev) {
    // 개발 모드: Next.js dev 서버 (http://localhost:3000)
    mainWindow.loadURL('http://localhost:3000');
  } else {
    // 프로덕션: 커스텀 app:// 프로토콜로 로드
    mainWindow.loadURL('app://./index.html');
  }

  // 외부 링크는 기본 브라우저로 열기
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ─────────────────────────────────────────────────────────
// 앱 준비 완료
// ─────────────────────────────────────────────────────────
app.whenReady().then(() => {
  // app:// 프로토콜 핸들러 — URL을 out/ 디렉토리의 파일로 매핑
  protocol.handle('app', (request) => {
    // app://./index.html        → out/index.html
    // app://./_next/static/...  → out/_next/static/...
    let urlPath = request.url.slice('app://./'.length);

    // 쿼리스트링 제거
    urlPath = urlPath.split('?')[0];

    let filePath = path.join(OUT_DIR, urlPath);

    // 디렉토리인 경우 index.html 추가
    // (Next.js trailingSlash: true 로 생성된 경로 처리)
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    // 파일이 없으면 루트 index.html 반환 (SPA 폴백)
    if (!fs.existsSync(filePath)) {
      filePath = path.join(OUT_DIR, 'index.html');
    }

    return net.fetch(pathToFileURL(filePath).toString());
  });

  createWindow();

  // macOS: Dock 아이콘 클릭 시 창 재생성
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 모든 창이 닫히면 앱 종료 (macOS 제외)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC: 앱 버전 조회
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});
