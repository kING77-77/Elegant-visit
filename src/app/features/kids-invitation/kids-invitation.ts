import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Countdown } from '../wedding-invitation/countdown/countdown';

type Lang = 'ru' | 'am' | 'en' | 'ge';

@Component({
  selector: 'app-kids-invitation',
  standalone: true,
  imports: [CommonModule, Countdown],
  templateUrl: './kids-invitation.html',
  styleUrl: './kids-invitation.scss'
})
export class KidsInvitationComponent implements OnInit, AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private observer: IntersectionObserver | null = null;

  readonly currentLang = signal<Lang>('ru');

  // Target event date: May 15, 2027
  readonly targetDate = '2027-05-15T15:00:00+04:00';

  readonly content = {
    ru: {
      heroSubtitle: 'Волшебная лесная вечеринка',
      childName: 'Лео',
      turningText: 'исполняется 5 лет!',
      heroDate: '15 Мая 2027 года в 15:00',
      
      block1Title: 'Сказка начинается',
      block1Text: 'Приглашаем вас в чудесный лесной уголок! Нас ждут увлечения, веселые игры, лесные зверята и атмосфера настоящего волшебства.',
      
      block2Title: 'Вкусный торт и забавы',
      block2Text: 'Праздничный торт с лесными ягодами, поиски сокровищ, аниматоры и множество сюрпризов для каждого гостя!',

      block3Title: 'Особенный день',
      block3Text: 'Будем рады видеть вас на нашей волшебной лесной поляне, чтобы вместе разделить улыбки, радость и смех!',

      invitationTitle: 'Приглашение на праздник',
      invitationDesc: 'Мы с радостью ждем каждого из вас на нашем детском празднике!',

      detailsTitle: 'Детали праздника',
      dateLabel: 'Дата:',
      dateVal: '15 Мая 2027 года (Суббота)',
      timeLabel: 'Время:',
      timeVal: '15:00 - 19:00',
      locationLabel: 'Место проведения:',
      locationVal: 'Игровой комплекс «Magic Forest Park», ул. Лесная 24',

      countdownPretitle: 'Особенный день приближается',
      countdownTitle: 'До дня рождения осталось',

      closingMessage: 'We can\'t wait to celebrate this special day with you!',
      closingSub: 'С нетерпением ждем возможности отпраздновать этот особенный день с вами!'
    },
    am: {
      heroSubtitle: 'Կախարդական անտառային խնջույք',
      childName: 'Լեո',
      turningText: 'դառնում է 5 տարեկան:',
      heroDate: '15 Մայիսի 2027թ. ժամը 15:00-ին',

      block1Title: 'Հեքիաթը սկսվում է',
      block1Text: 'Հրավիրում ենք ձեզ կախարդական անտառային անկյուն: Ձեզ սպասում են ուրախ խաղեր, անտառային կենդանիներ և իսկական հրաշքներ:',

      block2Title: 'Համեղ տորթ և զվարճանքներ',
      block2Text: 'Տոնական տորթ անտառային հատապտուղներով, գանձերի որոնում, ուրախ ծրագիր և բազմաթիվ անակնկալներ:',

      block3Title: 'Հատուկ օր',
      block3Text: 'Սիրով սպասում ենք ձեզ մեր կախարդական անտառային տոնին, որպեսզի միասին կիսենք ժպիտներն ու ուրախությունը:',

      invitationTitle: 'Հրավեր տոնին',
      invitationDesc: 'Մենք սիրով սպասում ենք յուրաքանչյուրիդ մեր մանկական տոնին:',

      detailsTitle: 'Տոնի մանրամասները',
      dateLabel: 'Ամսաթիվ:',
      dateVal: '15 Մայիսի 2027թ. (Շաբաթ)',
      timeLabel: 'Ժամ:',
      timeVal: '15:00 - 19:00',
      locationLabel: 'Վայրը:',
      locationVal: '«Magic Forest Park» խաղային համալիր, Լեսնայա փող. 24',

      countdownPretitle: 'Մեծ օրը մոտենում է',
      countdownTitle: 'Մինչև ծնունդը մնացել է',

      closingMessage: 'We can\'t wait to celebrate this special day with you!',
      closingSub: 'Անհամբերությամբ սպասում ենք ձեզ հետ այս հատուկ օրը նշելուն:'
    },
    en: {
      heroSubtitle: 'A Magical Woodland Celebration',
      childName: 'Leo',
      turningText: 'is turning 5!',
      heroDate: 'May 15, 2027 at 3:00 PM',

      block1Title: 'The Fairytale Begins',
      block1Text: 'Join us in a magical woodland forest filled with laughter, fun party games, cute forest animals, and enchantment!',

      block2Title: 'Delicious Treats & Fun',
      block2Text: 'A woodland berry birthday cake, treasure hunt, forest magic show, and joyful surprises for all our little guests!',

      block3Title: 'A Very Special Day',
      block3Text: 'We can\'t wait to gather in our dreamy forest nook to share happy smiles, warmth, and magical moments together.',

      invitationTitle: 'Magical Birthday Invitation',
      invitationDesc: 'We warmly invite you to celebrate this delightful milestone with us!',

      detailsTitle: 'Party Details',
      dateLabel: 'Date:',
      dateVal: 'Saturday, May 15, 2027',
      timeLabel: 'Time:',
      timeVal: '3:00 PM - 7:00 PM',
      locationLabel: 'Location:',
      locationVal: '«Magic Forest Park» Event Hall, 24 Woodland Ave',

      countdownPretitle: 'The Big Day Is Approaching',
      countdownTitle: 'Until the birthday party',

      closingMessage: 'We can\'t wait to celebrate this special day with you!',
      closingSub: 'We are so excited to share this magical day together!'
    },
    ge: {
      heroSubtitle: 'ჯადოსნური ტყის წვეულება',
      childName: 'ლეო',
      turningText: 'ხდება 5 წლის!',
      heroDate: '15 მაისი 2027 წელი, 15:00 საათი',

      block1Title: 'ზღაპარი იწყება',
      block1Text: 'მოგიწვევთ ჯადოსნურ ტყის კუთხეში! გელოდებათ მხიარული თამაშები, ტყის ცხოველები და ნამდვილი ჯადოსნობა.',

      block2Title: 'გემრიელი ტორტი და გართობა',
      block2Text: 'სადღესასწაულო ტორტი ტყის კენკრით, განძის ძიება, შოუ და უამრავი სიურპრიზი თითოეული სტუმრისთვის!',

      block3Title: 'განსაკუთრებული დღე',
      block3Text: 'სიხარულით გელოდებით ჩვენს ჯადოსნურ დღესასწაულზე, რათա ერთად გავაზიարოთ ღიმილი და სიხარული!',

      invitationTitle: 'მოწვევა დღესასწაულზე',
      invitationDesc: 'სიხარულით ველოდებით თითოეულ თქვენგანს!',

      detailsTitle: 'წვეულების დეტალები',
      dateLabel: 'თარიღი:',
      dateVal: '15 მაისი 2027 წელი (შაბათი)',
      timeLabel: 'დრო:',
      timeVal: '15:00 - 19:00',
      locationLabel: 'ადგილი:',
      locationVal: '«Magic Forest Park», ტყის ქუჩა 24',

      countdownPretitle: 'დიდი დღე ახლოვდება',
      countdownTitle: 'დაბადების დღემდე დარჩა',

      closingMessage: 'We can\'t wait to celebrate this special day with you!',
      closingSub: 'მოუთმენლად ველოდებით ამ განსაკუთრებული დღის აღნიშვნას თქვენთან ერთად!'
    }
  };

  get t() {
    return this.content[this.currentLang()];
  }

  setLanguage(lang: Lang): void {
    this.currentLang.set(lang);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setupScrollObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupScrollObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, options);

    const animatedElements = this.el.nativeElement.querySelectorAll('.reveal-on-scroll');
    animatedElements.forEach((element: HTMLElement) => {
      this.observer?.observe(element);
    });
  }
}
