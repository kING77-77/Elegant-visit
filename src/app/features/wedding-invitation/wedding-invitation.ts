import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Countdown } from './countdown/countdown';
import { Footer } from './footer/footer';
import { TranslationService, Language } from '../../core/services/translation.service';

@Component({
  selector: 'app-wedding-invitation',
  standalone: true,
  imports: [CommonModule, FormsModule, Countdown, Footer],
  templateUrl: './wedding-invitation.html',
  styleUrl: './wedding-invitation.css'
})
export class WeddingInvitationComponent implements OnInit, AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  protected readonly ts = inject(TranslationService);
  private observer: IntersectionObserver | null = null;

  // Language Selection inside Template
  protected readonly languages: { code: Language; label: string; flag: string }[] = [
    { code: 'am', label: 'AM', flag: '🇦🇲' },
    { code: 'ru', label: 'RU', flag: '🇷🇺' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'ka', label: 'KA', flag: '🇬🇪' }
  ];

  // Customizable wedding data
  protected readonly brideName = 'Isabella';
  protected readonly groomName = 'Alexander';
  protected readonly weddingDate = '23.01.2027';

  protected readonly ceremonyTime = '16:00';
  protected readonly ceremonyLocation = 'St. Nicholas Church';
  protected readonly ceremonyAddress = 'Grand Avenue 42, City Center';

  protected readonly receptionTime = '18:30';
  protected readonly receptionLocation = 'Villa Grand Resort';
  protected readonly receptionAddress = 'Royal Park Road 108, Lake Side';

  // RSVP Form State
  protected rsvpAttending: boolean = true;
  protected guestName: string = '';
  protected guestCount: number = 1;
  protected guestNote: string = '';
  protected isSubmitting: boolean = false;
  protected isSubmitted: boolean = false;

  // Translations dictionary for wedding invitation
  private readonly texts: Record<Language, Record<string, string>> = {
    am: {
      heroPretitle: 'Հարսանեկան հրավեր',
      invitationHeading: 'Սիրելի հարազատներ և ընկերներ',
      invitationText: 'Սիրով հրավիրում ենք Ձեզ տոնելու մեր կյանքի ամենաերջանիկ օրերից մեկը: Ձեր ներկայությունը այս օրը կդարձնի ավելի հիշարժան:',
      
      scheduleSubtitle: 'Ծրագիր',
      scheduleTitle: 'Ժամանակացույց և մանրամասներ',
      
      dateTitle: 'Ամսաթիվ',
      dateFormatted: 'Շաբաթ, 23 Հունվարի 2027',
      dateDesc: 'Պահպանեք ամսաթիվը Ձեր օրացույցում',
      
      timeTitle: 'Ժամ',
      timeGathering: 'Հյուրերի հավաք 15:30-ին',
      timeCeremony: 'Պաշտոնական արարողությունը 16:00-ին',
      
      ceremonyTitle: 'Պսակադրություն',
      
      receptionTitle: 'Հարսանեկան խնջույք',
      receptionParty: 'Տոնական banquet և երեկույթ 18:30-ին',
      
      dressCodeSubtitle: 'Խորհուրդներ զգեստների վերաբերյալ',
      dressCodeTitle: 'Դրես-կոդ',
      dressCodeDesc: 'Շնորհակալ կլինենք, եթե Ձեր հագուստի գույներում ընտրեք մեր հարսանեկան երանգները.',
      
      swatchNude: 'Նուդ',
      swatchChampagne: 'Շամպայն',
      swatchTaupe: 'Տոպ',
      swatchRose: 'Նուրբ վարդագույն',
      swatchSage: 'Եղեսպակի կանաչ',

      rsvpSubtitle: 'Հաստատում',
      rsvpTitle: 'RSVP / Կգա՞ք հարսանիքին',
      rsvpDesc: 'Խնդրում ենք հաստատել Ձեր մասնակցությունը մինչև 2027թ. հունվարի 10-ը, որպեսզի կարողանանք ամեն ինչ ճիշտ պլանավորել:',
      rsvpAttendingYes: 'Այո, սիրով կգամ',
      rsvpAttendingNo: 'Ցավոք, չեմ կարող',
      rsvpNameLabel: 'Ձեր անունը և ազգանունը',
      rsvpNamePlaceholder: 'Օրինակ՝ Արմեն և Անի',
      rsvpCountLabel: 'Հյուրերի քանակը',
      rsvpNoteLabel: 'Մաղթանքներ կամ մեկնաբանություն',
      rsvpNotePlaceholder: 'Ձեր մաղթանքը...',
      rsvpSubmitBtn: 'Ուղարկել պատասխանը',
      rsvpSuccessMsg: 'Շնորհակալություն: Ձեր պատասխանը հաջողությամբ ընդունվել է:',

      footerMessage: '«Անհամբերությամբ սպասում ենք Ձեզ հետ միասին տոնելու այս անմոռանալի օրը:»',
      footerWithLove: 'Սիրով՝',
      footerCouple: 'Իզաբելլա և Ալեքսանդր'
    },
    ru: {
      heroPretitle: 'Свадебное приглашение',
      invitationHeading: 'Дорогие близкие и друзья',
      invitationText: 'Мы с радостью приглашаем вас разделить с нами один из самых счастливых дней нашей жизни. Ваше присутствие сделает этот день незабываемым.',
      
      scheduleSubtitle: 'Программа дня',
      scheduleTitle: 'Расписание и детали',
      
      dateTitle: 'Дата',
      dateFormatted: 'Суббота, 23 января 2027',
      dateDesc: 'Сохраните эту дату в вашем календаре',
      
      timeTitle: 'Время',
      timeGathering: 'Сбор гостей в 15:30',
      timeCeremony: 'Официальное начало в 16:00',
      
      ceremonyTitle: 'Церемония',
      
      receptionTitle: 'Банкет',
      receptionParty: 'Праздничный банкет и вечеринка в 18:30',
      
      dressCodeSubtitle: 'Рекомендации по нарядам',
      dressCodeTitle: 'Дресс-код',
      dressCodeDesc: 'Будем искренне признательны, если при выборе нарядов вы придержитесь следующей палитры оттенков:',
      
      swatchNude: 'Нюд',
      swatchChampagne: 'Шампань',
      swatchTaupe: 'Теплый Тауп',
      swatchRose: 'Нежная роза',
      swatchSage: 'Шалфейный',

      rsvpSubtitle: 'Подтверждение',
      rsvpTitle: 'RSVP / Подтверждение присутствия',
      rsvpDesc: 'Пожалуйста, подтвердите ваше присутствие до 10 января 2027 года, чтобы мы могли правильно спланировать праздник.',
      rsvpAttendingYes: 'Могу прийти (Я буду!)',
      rsvpAttendingNo: 'К сожалению, не смогу',
      rsvpNameLabel: 'Ваше имя и фамилия',
      rsvpNamePlaceholder: 'Например: Александр и Мария',
      rsvpCountLabel: 'Количество гостей (включая вас)',
      rsvpNoteLabel: 'Пожелания или комментарий',
      rsvpNotePlaceholder: 'Ваш комментарий или пожелание...',
      rsvpSubmitBtn: 'Отправить ответ',
      rsvpSuccessMsg: 'Спасибо! Ваш ответ успешно принят.',

      footerMessage: '«Мы с нетерпением ждем возможности разделить этот незабываемый день вместе с вами.»',
      footerWithLove: 'С любовью,',
      footerCouple: 'Изабелла и Александр'
    },
    en: {
      heroPretitle: 'The Wedding Of',
      invitationHeading: 'Dear Family & Friends',
      invitationText: 'We are delighted to invite you to celebrate one of the happiest days of our lives. Your presence will make this day even more special.',
      
      scheduleSubtitle: 'Event Guide',
      scheduleTitle: 'Wedding Schedule & Details',
      
      dateTitle: 'Date',
      dateFormatted: 'Saturday, January 23, 2027',
      dateDesc: 'Save our date in your calendar',
      
      timeTitle: 'Time',
      timeGathering: 'Gathering at 15:30',
      timeCeremony: 'Official ceremony starts at 16:00',
      
      ceremonyTitle: 'Ceremony',
      
      receptionTitle: 'Reception',
      receptionParty: 'Banquet & party at 18:30',
      
      dressCodeSubtitle: 'Attire Recommendations',
      dressCodeTitle: 'Dress Code',
      dressCodeDesc: 'We would be honored if you choose outfit colors from our wedding palette to complement our aesthetic:',
      
      swatchNude: 'Nude',
      swatchChampagne: 'Champagne',
      swatchTaupe: 'Warm Taupe',
      swatchRose: 'Soft Rose',
      swatchSage: 'Sage Green',

      rsvpSubtitle: 'RSVP',
      rsvpTitle: 'RSVP / Attendance Confirmation',
      rsvpDesc: 'Please let us know if you will be joining us on our special day before January 10, 2027.',
      rsvpAttendingYes: 'Will Attend (I\'ll be there!)',
      rsvpAttendingNo: 'Regretfully Cannot Attend',
      rsvpNameLabel: 'Your Full Name(s)',
      rsvpNamePlaceholder: 'e.g., John & Sarah',
      rsvpCountLabel: 'Number of Guests (including you)',
      rsvpNoteLabel: 'Wishes or Special Notes',
      rsvpNotePlaceholder: 'Any dietary restrictions or wishes...',
      rsvpSubmitBtn: 'Send Response',
      rsvpSuccessMsg: 'Thank you! Your response has been recorded.',

      footerMessage: '"We are looking forward to celebrating this unforgettable day together with you."',
      footerWithLove: 'With love,',
      footerCouple: 'Isabella & Alexander'
    },
    ka: {
      heroPretitle: 'ქორწილი',
      invitationHeading: 'ძვირფასო ოჯახის წევრებო და მეგობრებო',
      invitationText: 'სიხარულით გეპატიჟებით ჩვენი ცხოვრების ერთ-ერთი ყველაზე ბედნიერი დღის აღსანიშნავად. თქვენი დასწრება ამ დღეს კიდევ უფრო განსაკუთრებულს გახდის.',
      
      scheduleSubtitle: 'ღონისძიების განრიგი',
      scheduleTitle: 'განრიგი და დეტალები',
      
      dateTitle: 'თარიღი',
      dateFormatted: 'შაბათი, 23 იანვარი 2027',
      dateDesc: 'შეინახეთ ეს თარიღი კალენდარში',
      
      timeTitle: 'დრო',
      timeGathering: 'სტუმრების შეკრება 15:30-ზე',
      timeCeremony: 'ოფიციალური ცერემონია 16:00-ზე',
      
      ceremonyTitle: 'ცერემონია',
      
      receptionTitle: 'ბანკეტი',
      receptionParty: 'სადღესასწაულო ბანკეტი და წვეულება 18:30-ზე',
      
      dressCodeSubtitle: 'რეკომენდაციები ჩაცმულობაზე',
      dressCodeTitle: 'დრეს კოდი',
      dressCodeDesc: 'მადლობელი ვიქნებით, თუ სამოსის შერჩევისას გაითვალისწინებთ ჩვენი ქორწილის პალიტრას:',
      
      swatchNude: 'ნუდი',
      swatchChampagne: 'შამპანური',
      swatchTaupe: 'თბილი ტოპი',
      swatchRose: 'ნაზი ვარდი',
      swatchSage: 'სალბისფერი',

      rsvpSubtitle: 'დადასტურება',
      rsvpTitle: 'RSVP / დასწრების დადასტურება',
      rsvpDesc: 'გთხოვთ დაგვიდასტუროთ თქვენი დასწრება 2027 წლის 10 იანვრამდე.',
      rsvpAttendingYes: 'დიახ, დავესწრები',
      rsvpAttendingNo: 'სამწუხაროდ, ვერ დავესწრები',
      rsvpNameLabel: 'თქვენი სახელი და გვარი',
      rsvpNamePlaceholder: 'მაგ: გიორგი და ნინო',
      rsvpCountLabel: 'სტუმრების რაოდენობა',
      rsvpNoteLabel: 'სურვილები ან კომენტარი',
      rsvpNotePlaceholder: 'თქვენი კომენტარი ან სურვილი...',
      rsvpSubmitBtn: 'პასუხის გაგზავნა',
      rsvpSuccessMsg: 'გმადლობთ! თქვენი პასუხი მიღებულია.',

      footerMessage: '«მოუთმენლად ველოდებით თქვენთან ერთად ამ დაუვიწყარი დღის აღნიშნავს.»',
      footerWithLove: 'სიყვარულით,',
      footerCouple: 'იზაბელა და ალექსანდრე'
    }
  };

  protected t(key: string): string {
    const lang = this.ts.currentLang();
    return this.texts[lang]?.[key] || this.texts['en']?.[key] || key;
  }

  protected setLanguage(lang: Language): void {
    this.ts.setLanguage(lang);
  }

  protected get dressCodeSwatches() {
    return [
      { name: this.t('swatchNude'), color: '#F3E9DF', border: '#e2d4c3' },
      { name: this.t('swatchChampagne'), color: '#E6D7C3', border: '#d8c5ad' },
      { name: this.t('swatchTaupe'), color: '#B8A99A', border: '#a39383' },
      { name: this.t('swatchRose'), color: '#E4C5C4', border: '#d5b3b2' },
      { name: this.t('swatchSage'), color: '#9EAB9C', border: '#8b9a89' }
    ];
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

  protected setAttending(attending: boolean): void {
    this.rsvpAttending = attending;
  }

  protected submitRsvp(event: Event): void {
    event.preventDefault();
    if (!this.guestName.trim()) return;

    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;
      this.isSubmitted = true;
    }, 600);
  }

  private setupScrollObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
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
