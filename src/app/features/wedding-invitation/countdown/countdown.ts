import { Component, OnInit, OnDestroy, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countdown.html',
  styleUrl: './countdown.css'
})
export class Countdown implements OnInit, OnDestroy {
  protected readonly ts = inject(TranslationService);

  @Input() targetDateInput?: string | Date;
  @Input() titleInput?: string;
  @Input() subtitleInput?: string;
  @Input() pretitleInput?: string;

  targetDate = new Date('2027-01-23T18:00:00+04:00').getTime();
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  timer: any;

  get pretitle(): string {
    if (this.pretitleInput) return this.pretitleInput;
    switch (this.ts.currentLang()) {
      case 'ru': return 'Приближается наш важный день';
      case 'en': return 'The Big Day Is Approaching';
      case 'ka': return 'უახლოვდება ჩვენი დიდი დღე';
      default: return 'Մոտենում է մեր մեծ օրը';
    }
  }

  get title(): string {
    if (this.titleInput) return this.titleInput;
    switch (this.ts.currentLang()) {
      case 'ru': return 'До нашей свадьбы осталось';
      case 'en': return 'Time Remaining Until Wedding';
      case 'ka': return 'ქորწილამდე დარჩა';
      default: return 'Մինչև հարսանիքը մնացել է';
    }
  }

  get labelDays(): string {
    switch (this.ts.currentLang()) {
      case 'ru': return 'Дней';
      case 'en': return 'Days';
      case 'ka': return 'დღე';
      default: return 'Օր';
    }
  }

  get labelHours(): string {
    switch (this.ts.currentLang()) {
      case 'ru': return 'Часов';
      case 'en': return 'Hours';
      case 'ka': return 'საათի';
      default: return 'Ժամ';
    }
  }

  get labelMinutes(): string {
    switch (this.ts.currentLang()) {
      case 'ru': return 'Минут';
      case 'en': return 'Minutes';
      case 'ka': return 'წუთի';
      default: return 'Րոպե';
    }
  }

  get labelSeconds(): string {
    switch (this.ts.currentLang()) {
      case 'ru': return 'Секунд';
      case 'en': return 'Seconds';
      case 'ka': return 'წամի';
      default: return 'Վրկ';
    }
  }

  ngOnInit() {
    if (this.targetDateInput) {
      this.targetDate = new Date(this.targetDateInput).getTime();
    }
    this.updateTime();
    this.timer = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  updateTime() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    if (distance < 0) {
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      return;
    }

    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }

  format(num: number): string {
    return num < 10 ? '0' + num : '' + num;
  }
}
