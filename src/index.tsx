import ReactDOM from "react-dom/client";
import App from "./App";
import I18nProvider from "./i18n/I18nProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <I18nProvider>
    <App />
  </I18nProvider>
);
