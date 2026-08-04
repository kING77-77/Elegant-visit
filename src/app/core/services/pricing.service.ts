import { Injectable } from '@angular/core';
import { Template } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class PricingService {
  private readonly currencyMap: Record<string, string> = {
    en: 'USD',
    ru: 'RUB',
    hy: 'AMD',
    ka: 'GEL'
  };

  private readonly localeMap: Record<string, string> = {
    en: 'en-US',
    ru: 'ru-RU',
    hy: 'hy-AM',
    ka: 'ka-GE'
  };

  getLocalizedPrice(
    template: Template | null | undefined,
    currentLang: string
  ): string {
    if (!template?.prices) return '';

    const priceKey = currentLang === 'am' ? 'hy' : currentLang;

    const price = template.prices[
      priceKey as keyof typeof template.prices
    ];

    if (typeof price !== 'number') {
      return '';
    }

    return this.getLocalePrice(price, priceKey);
  }

  getLocalePrice(price: number, currentLang: string): string {
    if (price === undefined || price === null) return '';

    const priceKey = currentLang === 'am' ? 'hy' : currentLang;

    const currency = this.currencyMap[priceKey] ?? 'USD';
    const locale = this.localeMap[priceKey] ?? 'en-US';

    try {
      const hasDecimals = price % 1 !== 0;
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: hasDecimals ? 2 : 0,
        maximumFractionDigits: hasDecimals ? 2 : 0
      }).format(price);
    } catch {
      return `${price} ${currency}`;
    }
  }
}