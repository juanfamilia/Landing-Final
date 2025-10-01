// Manual translation system - replacement for next-intl
export const locales = ['en', 'es'] as const;
export type LocaleType = typeof locales[number];

interface Messages {
  [key: string]: unknown;
}

const cachedMessages: Record<string, Messages> = {};

export async function getTranslations(locale: LocaleType): Promise<Messages> {
  if (cachedMessages[locale]) {
    return cachedMessages[locale];
  }

  try {
    const messages = (await import(`../messages/${locale}.json`)).default;
    cachedMessages[locale] = messages;
    return messages;
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
    // Fallback to English if locale fails
    if (locale !== 'en') {
      return getTranslations('en');
    }
    throw error;
  }
}

export function isValidLocale(locale: string): locale is LocaleType {
  return locales.includes(locale as LocaleType);
}