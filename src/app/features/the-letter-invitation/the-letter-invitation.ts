import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService, Language } from '../../core/services/translation.service';

@Component({
  selector: 'app-the-letter-invitation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './the-letter-invitation.html',
  styleUrl: './the-letter-invitation.css'
})
export class TheLetterInvitationComponent implements OnInit, AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  protected readonly ts = inject(TranslationService);
  private observer: IntersectionObserver | null = null;

  // Envelope Opening Animation State
  protected isEnvelopeOpened: boolean = false;
  protected isOpening: boolean = false;

  // Language selector
  protected readonly languages: { code: Language; label: string; flag: string }[] = [
    { code: 'am', label: 'AM', flag: '🇦🇲' },
    { code: 'ru', label: 'RU', flag: '🇷🇺' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'ka', label: 'KA', flag: '🇬🇪' }
  ];

  // Couple Data
  protected readonly brideName = 'Sophia';
  protected readonly groomName = 'Michael';
  protected readonly weddingDate = '18.09.2027';

  // Venue Data
  protected readonly venueName = 'Fishery, golden fish';
  protected readonly venueCity = 'Bolnisi, Georgia';
  protected readonly venueAddress = 'Village bolnisi';
  protected readonly mapUrl = 'https://www.google.com/maps/place/Restaurant,+fishery+Golden+Fish/@41.3811052,44.5245143,17z/data=!4m6!3m5!1s0x4043e791d72c6ba7:0xf7069b93eeed5c81!8m2!3d41.3811052!4d44.5245143!16s%2Fg%2F11jd8d01jb?hl=ru&entry=ttu&g_ep=EgoyMDI2MDgwMi4wIKXMDSoASAFQAw%3D%3D';

  // Countdown timer calculation
  protected readonly targetDate = new Date('2027-09-18T16:00:00+04:00').getTime();
  protected days: number = 0;
  protected hours: number = 0;
  protected minutes: number = 0;
  protected seconds: number = 0;
  private timer: any;

  // RSVP Form State
  protected rsvpAttending: boolean = true;
  protected guestName: string = '';
  protected guestCount: number = 1;
  protected guestNote: string = '';
  protected isSubmitting: boolean = false;
  protected isSubmitted: boolean = false;

  // Dictionary for "The Letter"
  private readonly texts: Record<Language, Record<string, string>> = {
    am: {
      openPrompt: 'Սեղմեք հրավերը բացելու համար',
      envelopeTitle: 'ՀԱՐՍԱՆԵԿԱՆ ՀՐԱՎԵՐ',
      
      heroSubtitle: 'ՀԱՐՍԱՆԵԿԱՆ ՆԱՄԱԿ',
      heroCouple: 'Սոֆիա և Միքայել',
      heroDate: '18 ՍԵՊՏԵՄԲԵՐԻ 2027',
      
      letterHeader: 'Սիրելի հարազատներ և ընկերներ',
      letterBody: 'Մեր սրտերում մեծ սիրով և հուզմունքով հրավիրում ենք Ձեզ տոնելու մեր միության ամենալուսավոր օրը: Ձեր ներկայությունը մեր տոնը կդարձնի կատարյալ:',
      letterSeal: 'Սիրով և ջերմությամբ',

      detailsSubtitle: 'ԻՐԱԴԱՐՁՈՒԹՅԱՆ ՄԱՆՐԱՄԱՍՆԵՐԸ',
      detailsTitle: 'Ամսաթիվ և Վայր',
      dateLabel: 'Ամսաթիվ',
      dateValue: 'Շաբաթ, 18 Սեպտեմբերի 2027',
      timeLabel: 'Ժամ',
      timeValue: 'Սկիզբը՝ 15:30-ին',
      venueLabel: 'Վայր',

      timelineSubtitle: 'ՕՐՎԱ ԾՐԱԳԻՐԸ',
      timelineTitle: 'Ժամանակացույց',
      t1Time: '15:30',
      t1Title: 'Հյուրերի դիմավորում & Կոկտեյլ',
      t1Desc: 'Թեթև ըմպելիքներ և կենդանի երաժշտություն այգում',
      t2Time: '16:30',
      t2Title: 'Հանդիսավոր Արարողություն',
      t2Desc: 'Ուխտի խոսքեր և պսակադրություն',
      t3Time: '18:00',
      t3Title: 'Տոնական Ընթրիք',
      t3Desc: 'Գալա-ընթրիք, մաղթանքներ և շամպայն',
      t4Time: '21:00',
      t4Title: 'Տորթ & Երեկույթ',
      t4Desc: 'Հարսանեկան տորթ, պարեր և հրավառություն',

      gallerySubtitle: 'ՄԵՐ ՊԱՏՄՈՒԹՅՈՒՆԸ',
      galleryTitle: 'Լուսանկարների Պատկերասրահ',

      locationSubtitle: 'ԻՆՉՊԵՍ ՀԱՍՆԵԼ',
      locationTitle: 'Տեղադրություն',
      locationBtn: 'Բացել Քարտեզում',

      rsvpSubtitle: 'ՀԱՍՏԱՏՈՒՄ',
      rsvpTitle: 'RSVP / Ձեր Պատասխանը',
      rsvpDesc: 'Խնդրում ենք հաստատել Ձեր մասնակցությունը մինչև 2027թ. օգոստոսի 20-ը:',
      rsvpYes: 'Այո, սիրով կգամ',
      rsvpNo: 'Ցավոք, չեմ կարող',
      rsvpName: 'Ձեր Անուն Ազգանունը',
      rsvpNamePlaceholder: 'օր.՝ Սոֆիա և Միքայել',
      rsvpCount: 'Հյուրերի քանակը',
      rsvpNote: 'Մաղթանք կամ նշումներ',
      rsvpNotePlaceholder: 'Ձեր մաղթանքը...',
      rsvpSubmit: 'Ուղարկել Պատասխանը',
      rsvpSuccess: 'Շնորհակալություն: Ձեր պատասխանը ընդունված է:',

      footerMessage: '«Սերն այն միակ բանն է, որն աճում է, երբ այն կիսում ես:»',
      footerWithLove: 'Անհամբերությամբ սպասում ենք Ձեզ,',
      footerNames: 'Սոֆիա & Միքայել',

      timerDays: 'Օր',
      timerHours: 'Ժամ',
      timerMinutes: 'Րոպե',
      timerSeconds: 'Վրկ'
    },
    ru: {
      openPrompt: 'Нажмите, чтобы открыть приглашение',
      envelopeTitle: 'СВАДЕБНОЕ ПРИГЛАШЕНИЕ',
      
      heroSubtitle: 'СВАДЕБНОЕ ПИСЬМО',
      heroCouple: 'София и Михаил',
      heroDate: '18 СЕНТЯБРЯ 2027',
      
      letterHeader: 'Дорогие близкие и друзья',
      letterBody: 'С открытым сердцем и любовью мы приглашаем вас разделить самый счастливый и трепетный день в нашей жизни. Ваше присутствие сделает наш праздник поистине особенным.',
      letterSeal: 'С любовью и нежностью',

      detailsSubtitle: 'ДЕТАЛИ ТОРЖЕСТВА',
      detailsTitle: 'Дата и Место',
      dateLabel: 'Дата',
      dateValue: 'Суббота, 18 сентября 2027',
      timeLabel: 'Время',
      timeValue: 'Сбор гостей в 15:30',
      venueLabel: 'Локация',

      timelineSubtitle: 'ПРОГРАММА ДНЯ',
      timelineTitle: 'Тайминг событий',
      t1Time: '15:30',
      t1Title: 'Приветственный коктейль',
      t1Desc: 'Сбор гостей, легкие закуски и живая музыка',
      t2Time: '16:30',
      t2Title: 'Свадебная церемония',
      t2Desc: 'Торжественные клятвы и выездная регистрация',
      t3Time: '18:00',
      t3Title: 'Праздничный ужин',
      t3Desc: 'Гала-ужин, тосты и поздравления',
      t4Time: '21:00',
      t4Title: 'Свадебный торт и шоу',
      t4Desc: 'Разрезание торта, танцы и праздничный фейерверк',

      gallerySubtitle: 'НАША ИСТОРИЯ',
      galleryTitle: 'Галерея мгновений',

      locationSubtitle: 'КАК ДОБРАТЬСЯ',
      locationTitle: 'Локация торжества',
      locationBtn: 'Открыть на карте',

      rsvpSubtitle: 'ПОДТВЕРЖДЕНИЕ',
      rsvpTitle: 'RSVP / Ваш ответ',
      rsvpDesc: 'Пожалуйста, подтвердите ваше присутствие до 20 августа 2027 года.',
      rsvpYes: 'Да, я приду!',
      rsvpNo: 'К сожалению, не смогу',
      rsvpName: 'Ваше имя и фамилия',
      rsvpNamePlaceholder: 'Например: София и Михаил',
      rsvpCount: 'Количество гостей',
      rsvpNote: 'Пожелания или комментарий',
      rsvpNotePlaceholder: 'Ваш комментарий...',
      rsvpSubmit: 'Отправить ответ',
      rsvpSuccess: 'Спасибо! Ваш ответ успешно сохранен.',

      footerMessage: '«Любовь — это единственное, что умножается, когда им делятся.»',
      footerWithLove: 'С нетерпением ждем вас,',
      footerNames: 'София & Михаил',

      timerDays: 'Дней',
      timerHours: 'Часов',
      timerMinutes: 'Минут',
      timerSeconds: 'Секунд'
    },
    en: {
      openPrompt: 'Tap to open invitation',
      envelopeTitle: 'WEDDING INVITATION',
      
      heroSubtitle: 'THE WEDDING LETTER',
      heroCouple: 'Sophia & Michael',
      heroDate: 'SEPTEMBER 18, 2027',
      
      letterHeader: 'Dear Beloved Family & Friends',
      letterBody: 'Together with our families, we joyfully invite you to celebrate our wedding day. Your presence and warm blessings will mean the world to us as we begin our new journey.',
      letterSeal: 'With warmest regards',

      detailsSubtitle: 'EVENT INFORMATION',
      detailsTitle: 'Date & Venue',
      dateLabel: 'Date',
      dateValue: 'Saturday, September 18, 2027',
      timeLabel: 'Time',
      timeValue: 'Gathering at 15:30',
      venueLabel: 'Venue',

      timelineSubtitle: 'SCHEDULE OF EVENTS',
      timelineTitle: 'Program Timeline',
      t1Time: '15:30',
      t1Title: 'Welcome Cocktail',
      t1Desc: 'Guest arrival, light drinks & live acoustic music',
      t2Time: '16:30',
      t2Title: 'Wedding Ceremony',
      t2Desc: 'Exchange of vows under the floral arch',
      t3Time: '18:00',
      t3Title: 'Festive Dinner',
      t3Desc: 'Gala dinner, champagne toast & speeches',
      t4Time: '21:00',
      t4Title: 'Cake & Party',
      t4Desc: 'Cake cutting, dancing & evening celebration',

      gallerySubtitle: 'OUR MOMENTS',
      galleryTitle: 'Love Story Gallery',

      locationSubtitle: 'DIRECTIONS',
      locationTitle: 'Venue Location',
      locationBtn: 'Open in Maps',

      rsvpSubtitle: 'CONFIRMATION',
      rsvpTitle: 'RSVP Response',
      rsvpDesc: 'Please kindly respond by August 20, 2027 to help us prepare.',
      rsvpYes: 'Joyfully Accepts (I will attend)',
      rsvpNo: 'Regretfully Declines',
      rsvpName: 'Your Full Name(s)',
      rsvpNamePlaceholder: 'e.g., Sophia & Michael',
      rsvpCount: 'Number of Guests',
      rsvpNote: 'Special Notes or Wishes',
      rsvpNotePlaceholder: 'Any note for the couple...',
      rsvpSubmit: 'Submit RSVP',
      rsvpSuccess: 'Thank you! Your response has been recorded.',

      footerMessage: '"Love is the single thing that multiplies when shared."',
      footerWithLove: 'Looking forward to seeing you,',
      footerNames: 'Sophia & Michael',

      timerDays: 'Days',
      timerHours: 'Hours',
      timerMinutes: 'Mins',
      timerSeconds: 'Secs'
    },
    ka: {
      openPrompt: 'დააჭირეთ მოწვევის გასახსნელად',
      envelopeTitle: 'საქორწილო მოწვევა',
      
      heroSubtitle: 'საქორწილო წერილი',
      heroCouple: 'სოფია და მიხეილი',
      heroDate: '18 სექტემბერი 2027',
      
      letterHeader: 'ძვირფასო ოჯახის წევრებო და მეგობრებო',
      letterBody: 'სიყვარულითა და სიხარულით გეპატიჟებით ჩვენი ცხოვრების ყველაზე მნიშვნელოვანი დღის აღსანიშნავად. თქვენი დასწრება ამ დღეს დაუვიწყარს გახდის.',
      letterSeal: 'სიყვარულით',

      detailsSubtitle: 'ღონისძიების დეტალები',
      detailsTitle: 'თარიღი და ადგილი',
      dateLabel: 'თარიღի',
      dateValue: 'შაბათი, 18 სექტემბერი 2027',
      timeLabel: 'დრო',
      timeValue: 'შეკრება 15:30-ზე',
      venueLabel: 'ადგილი',

      timelineSubtitle: 'დღის განრიგი',
      timelineTitle: 'პროგრამა',
      t1Time: '15:30',
      t1Title: 'მისასალმებელი კოქტეილი',
      t1Desc: 'სტუმრების შეკრება და ცოცხალი მუსიკა',
      t2Time: '16:30',
      t2Title: 'საქორწილო ცერემონია',
      t2Desc: 'ოფიციალური ცერემონია და ფიცის დადება',
      t3Time: '18:00',
      t3Title: 'სადღესასწაულო ვახშამი',
      t3Desc: 'გალა ვახშამი და სადღეგრძელოები',
      t4Time: '21:00',
      t4Title: 'ტორტი და წვეულება',
      t4Desc: 'ტორტის გაჭრა და ცეკვები',

      gallerySubtitle: 'ჩვენი ისტორია',
      galleryTitle: 'ფოტო გალერეა',

      locationSubtitle: 'როგორ მოხვიდეთ',
      locationTitle: 'მდებარეობა',
      locationBtn: 'რუკაზე ნახვა',

      rsvpSubtitle: 'დადასტურება',
      rsvpTitle: 'RSVP / პასუხი',
      rsvpDesc: 'გთხოვთ დაგვიდასტუროთ თქვენი დასწრება 2027 წლის 20 აგვისტომდე.',
      rsvpYes: 'დიახ, დავესწრები',
      rsvpNo: 'სამწუხაროდ, ვერ დავესწრები',
      rsvpName: 'თქვენი სახელი და გვარი',
      rsvpNamePlaceholder: 'მაგ: სოფია და მიხეილი',
      rsvpCount: 'სტუმრების რაოდენობა',
      rsvpNote: 'სურვილები ან კომენტარი',
      rsvpNotePlaceholder: 'თქვენი კომენტარი...',
      rsvpSubmit: 'პასუხის გაგზავნა',
      rsvpSuccess: 'გმადლობთ! თქვენი პასუხი მიღებულია.',

      footerMessage: '«სიყვარული ერთადერთი რამაა, რაც იზრდება გაზიარებისას.»',
      footerWithLove: 'მოუთმենლად ველოდებით თქვენთან შეხვედრას,',
      footerNames: 'სოფია & მიხეილი',

      timerDays: 'დღე',
      timerHours: 'საათი',
      timerMinutes: 'წუთი',
      timerSeconds: 'წამი'
    }
  };

  protected t(key: string): string {
    const lang = this.ts.currentLang();
    return this.texts[lang]?.[key] || this.texts['en']?.[key] || key;
  }

  protected setLanguage(lang: Language): void {
    this.ts.setLanguage(lang);
  }

  protected openEnvelope(): void {
    if (this.isEnvelopeOpened || this.isOpening) return;
    this.isOpening = true;
    setTimeout(() => {
      this.isEnvelopeOpened = true;
      this.isOpening = false;
      // Trigger scroll observer once opened
      setTimeout(() => this.setupScrollObserver(), 100);
    }, 1100);
  }

  ngOnInit(): void {
    this.updateTimer();
    this.timer = setInterval(() => this.updateTimer(), 1000);
  }

  ngAfterViewInit(): void {
    if (this.isEnvelopeOpened) {
      this.setupScrollObserver();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  protected setAttending(status: boolean): void {
    this.rsvpAttending = status;
  }

  protected submitRsvp(e: Event): void {
    e.preventDefault();
    if (!this.guestName.trim()) return;

    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;
      this.isSubmitted = true;
    }, 700);
  }

  private updateTimer(): void {
    const now = new Date().getTime();
    const dist = this.targetDate - now;

    if (dist <= 0) {
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      return;
    }

    this.days = Math.floor(dist / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
  }

  protected format(n: number): string {
    return n < 10 ? '0' + n : '' + n;
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
