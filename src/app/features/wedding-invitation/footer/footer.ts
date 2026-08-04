import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  protected readonly ts = inject(TranslationService);

  private readonly texts = {
    am: {
      footerMessage: '«Անհամբերությամբ սպասում ենք Ձեզ հետ միասին տոնելու այս անմոռանալի օրը:»',
      footerWithLove: 'Սիրով՝',
      footerCouple: 'Իզաբելլա և Ալեքսանդր'
    },
    ru: {
      footerMessage: '«Мы с нетерпением ждем возможности разделить этот незабываемый день вместе с вами.»',
      footerWithLove: 'С любовью,',
      footerCouple: 'Изабелла и Александр'
    },
    en: {
      footerMessage: '"We are looking forward to celebrating this unforgettable day together with you."',
      footerWithLove: 'With love,',
      footerCouple: 'Isabella & Alexander'
    },
    ka: {
      footerMessage: '«მოუთმენლად ველოდებით თქვენთან ერთად ამ დაუვიწყარი დღის აღნიშնავს.»',
      footerWithLove: 'სიყვარულით,',
      footerCouple: 'იზաբելա და ალեքսանդრე'
    }
  };

  protected t(key: string): string {
    const lang = this.ts.currentLang();
    return (this.texts as any)[lang]?.[key] || (this.texts as any)['en']?.[key] || key;
  }
}
