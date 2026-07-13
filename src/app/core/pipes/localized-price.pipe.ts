import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { PricingService } from '../services/pricing.service';
import { Template } from '../models/types';

@Pipe({
  name: 'localizedPrice',
  standalone: true,
  pure: false
})
export class LocalizedPricePipe implements PipeTransform {
  private readonly translationService = inject(TranslationService);
  private readonly pricingService = inject(PricingService);

  transform(template: Template | null | undefined): string {
    return this.pricingService.getLocalizedPrice(template, this.translationService.currentLang());
  }
}
