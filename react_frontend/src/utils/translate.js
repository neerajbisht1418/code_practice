import { en } from "../i18n/en";
import { it } from "../i18n/it";
import { store } from "../redux/store";


const t = (text) => {
  const currentLang = store.getState().global.current_language;
  console.log(currentLang);
  if (currentLang === "en") {
    return en[text];
  } else if (currentLang === "it") {
    return it[text];
  }
};

export { t };
