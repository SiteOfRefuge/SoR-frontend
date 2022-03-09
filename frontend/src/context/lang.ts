import { createContext } from 'react';
import { SupportedLocale } from "../i18n"

export const LangContext = createContext<[SupportedLocale, Function]>(["en", () => {}]);
