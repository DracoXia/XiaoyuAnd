import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// --- 全局错误捕获 (用于调试白屏) ---
window.addEventListener('error', (event) => {
  const errorBox = document.createElement('div');
  errorBox.style.cssText = 'position:fixed;top:0;left:0;width:100%;background:rgba(255,0,0,0.9);color:white;padding:20px;z-index:9999;font-size:14px;overflow:auto;max-height:100vh;';
  errorBox.innerHTML = `<h3>⚠️ Application Crashed</h3><pre>${event.message}\n${event.filename}:${event.lineno}</pre>`;
  document.body.appendChild(errorBox);
});

window.addEventListener('unhandledrejection', (event) => {
  const errorBox = document.createElement('div');
  errorBox.style.cssText = 'position:fixed;bottom:0;left:0;width:100%;background:rgba(255,100,0,0.9);color:white;padding:20px;z-index:9999;font-size:14px;';
  errorBox.innerHTML = `<h3>⚠️ Unhandled Promise Rejection</h3><pre>${event.reason}</pre>`;
  document.body.appendChild(errorBox);
});
// ------------------------------------

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);