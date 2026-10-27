import { en } from './en';

const dictionaries = { en };
export type Locale = keyof typeof dictionaries;

export const useTranslations = (locale: string | undefined) =>
    dictionaries[(locale as Locale) ?? 'en'] ?? en;
