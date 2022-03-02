// import * as en from './lang/compiled/en.json';
// import * as ua from './lang/compiled/ua.json';

import { i18n } from '@lingui/core';
import { en, uk } from 'make-plural/plurals'


export const locales = {
  en: "English",
  uk: "українською",
};
export type SupportedLocale = keyof typeof locales;

export const defaultLocale: SupportedLocale = "en";

i18n.loadLocaleData({
  en: { plurals: en },
  uk: { plurals: uk },
})

/**
* We do a dynamic import of just the catalog that we need
* @param locale any locale string
*/
export async function dynamicActivate(locale: string) {
  const { messages } = await import(`./locales/${locale}/messages`)
  i18n.load(locale, messages)
  i18n.activate(locale)
}


// export const messages2 = {
//   en,
//   ua,
// }
