import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

async function enableMocking() {
  try {
    const { worker } = await import('./mocks/browser');
    
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js'
      }
    });
    
    console.log('✅ MSW started successfully');
  } catch (error) {
    console.error('❌ Failed to start MSW:', error);
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
