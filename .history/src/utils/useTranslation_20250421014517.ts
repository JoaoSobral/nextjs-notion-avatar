import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Custom translation hook for Next.js App Router.
 *
 * Loads translations from public/locales/[locale]/common.json and provides a t function.
 *
 * :returns: { t: (key: string) => string, locale: string }
 */
export function useTranslation() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`/locales/${locale}/common.json`)
      .then((res) => res.json())
      .then((data) => setTranslations(data));
  }, [locale]);

  /**
   * Translate a key using the loaded translations.
   *
   * :param key: The translation key.
   * :returns: The translated string or the key if not found.
   */
  function t(key: string): string {
    return translations[key] || key;
  }

  return { t, locale };
} 