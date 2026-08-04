import { Component, OnInit, OnDestroy, inject, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import intlTelInput from 'intl-tel-input';
import { ApiService } from '../../core/services/api.service';
import { Template } from '../../core/models/types';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { LocalizedPricePipe } from '../../core/pipes/localized-price.pipe';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-template-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, TranslatePipe, LocalizedPricePipe],
  templateUrl: './template-detail.html',
  styleUrl: './template-detail.scss'
})
export class TemplateDetailComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);
  private readonly fb = inject(FormBuilder);
  public readonly translationService = inject(TranslationService);

  @ViewChild('phoneInput') phoneInputRef?: ElementRef<HTMLInputElement>;

  readonly template = signal<Template | null>(null);
  readonly loading = signal<boolean>(true);
  readonly errorMsg = signal<string | null>(null);
  
  // Modal state
  readonly isModalOpen = signal<boolean>(false);
  readonly orderSuccess = signal<boolean>(false);
  readonly submitting = signal<boolean>(false);
  
  orderForm!: FormGroup;
  private iti: any = null;

  // Event types for the dropdown
  readonly eventTypes = [
    'Свадьба',
    'Корпоратив',
    'День рождения',
    'Детский праздник',
    'Юбилей',
    'Другое событие'
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadTemplate(Number(id));
      }
    });

    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroyIti();
  }

  initForm(): void {
    this.orderForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      eventType: ['Свадьба', [Validators.required]],
      eventDate: ['', [Validators.required]],
      comment: ['']
    });
  }

  loadTemplate(id: number): void {
    this.loading.set(true);
    this.apiService.getTemplateById(id).subscribe({
      next: (data) => {
        this.template.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMsg.set('detail.errorLoad');
        this.loading.set(false);
      }
    });
  }

  openModal(): void {
    this.orderForm.reset({
      eventType: 'Свадьба',
      comment: ''
    });
    this.orderSuccess.set(false);
    this.isModalOpen.set(true);

    // Initialize intl-tel-input after DOM updates
    setTimeout(() => {
      this.initIntlTelInput();
    }, 50);
  }

  closeModal(): void {
    this.destroyIti();
    this.isModalOpen.set(false);
  }

  private initIntlTelInput(): void {
    this.destroyIti();

    if (this.phoneInputRef?.nativeElement) {
      this.iti = intlTelInput(this.phoneInputRef.nativeElement, {
        initialCountry: 'ge',
        countryOrder: ['ge', 'am', 'ru'],
        separateDialCode: true,
        strictMode: true,
        loadUtils: () => import('intl-tel-input/utils')
      });

      // Clear custom error on typing
      this.phoneInputRef.nativeElement.addEventListener('input', () => {
        const phoneControl = this.orderForm.get('phone');
        if (phoneControl?.hasError('invalidPhone')) {
          const errors = { ...phoneControl.errors };
          delete errors['invalidPhone'];
          phoneControl.setErrors(Object.keys(errors).length ? errors : null);
        }
      });
    }
  }

  private destroyIti(): void {
    if (this.iti) {
      this.iti.destroy();
      this.iti = null;
    }
  }

  onSubmit(): void {
    const phoneControl = this.orderForm.get('phone');

    if (this.iti) {
      const isValid = this.iti.isValidNumber();
      const rawVal = this.phoneInputRef?.nativeElement.value?.trim();

      if (!rawVal) {
        phoneControl?.setErrors({ required: true });
      } else if (!isValid) {
        phoneControl?.setErrors({ invalidPhone: true });
      } else {
        const fullNumber = this.iti.getNumber();
        this.orderForm.patchValue({ phone: fullNumber });
      }
    }

    if (this.orderForm.invalid || !this.template()) {
      this.orderForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    
    const formVal = this.orderForm.value;
    const payload = {
      customerName: formVal.customerName,
      phone: formVal.phone,
      email: formVal.email,
      eventType: formVal.eventType,
      eventDate: formVal.eventDate,
      comment: formVal.comment || '',
      templateId: this.template()!.id
    };

    this.apiService.createOrder(payload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.orderSuccess.set(true);
      },
      error: () => {
        this.submitting.set(false);
        alert(this.translationService.translate('alert.error'));
      }
    });
  }

  // Helper getters for validation
  hasError(controlName: string, errorType: string): boolean {
    const control = this.orderForm.get(controlName);
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched));
  }

isBohoChicTemplate(): boolean {
  const t = this.template();

  if (!t) return false;

  const title = (t.title || '').toLowerCase();
  const imgUrl = (t.imageUrl || '').toLowerCase();

  return (
    title.includes('boho') ||
    title.includes('бохо') ||
    title.includes('classic') ||
    imgUrl.includes('boho') ||
    imgUrl.includes('classic')
  );
}

  isMagicalPartyTemplate(): boolean {
    const t = this.template();
    if (!t) return false;
    const title = (t.title || '').toLowerCase();
    const imgUrl = (t.imageUrl || '').toLowerCase();
    return title.includes('magical') || title.includes('forest') || title.includes('лесная') || title.includes('детск') || title.includes('магическ') || imgUrl.includes('kids_forest') || t.id === 5;
  }

  isTheLetterTemplate(): boolean {
    const t = this.template();
    if (!t) return false;
    const title = (t.title || '').toLowerCase();
    const imgUrl = (t.imageUrl || '').toLowerCase();
    return title.includes('letter') || title.includes('письмо') || title.includes('նամակ') || title.includes('წერի') || imgUrl.includes('the_letter') || t.id === 7;
  }

isStrictCorporateTemplate(): boolean {
  const t = this.template();

  if (!t) return false;

  const title = (t.title || '').toLowerCase();
  const imgUrl = (t.imageUrl || '').toLowerCase();

  return (
    title.includes('strict') ||
    title.includes('строг') ||
    title.includes('corporate') ||
    title.includes('корпоратив') ||
    imgUrl.includes('corporate')
  );
}

 getTemplateLink(t: Template | null): string {
  if (!t) return '/';

  console.log('CLICK TEMPLATE:', t);

  const title = (t.title || '').toLowerCase();
  const imgUrl = (t.imageUrl || '').toLowerCase();
  const desc = (t.description || '').toLowerCase();


  // Golden Luxury
  if (
    title.includes('golden') ||
    title.includes('luxury') ||
    title.includes('золот') ||
    imgUrl.includes('luxury')
  ) {
    return '/golden-luxury';
  }


  // Classic (раньше Boho)
  if (
    title.includes('classic') ||
    title.includes('boho') ||
    title.includes('бохо') ||
    imgUrl.includes('classic') ||
    imgUrl.includes('boho')
  ) {
    return '/wedding-invite';
  }


  // Minimalism
  if (
    title.includes('minimal') ||
    title.includes('минимал') ||
    imgUrl.includes('minimal')
  ) {
    return '/minimalism';
  }


  // The Letter / Corporate
  if (
    title.includes('letter') ||
    title.includes('письмо') ||
    title.includes('corporate') ||
    title.includes('корпоратив') ||
    desc.includes('corporate') ||
    imgUrl.includes('letter')
  ) {
    return '/the-letter';
  }


  // Magical Party
  if (
    title.includes('magical') ||
    title.includes('party') ||
    title.includes('birthday') ||
    title.includes('детск') ||
    imgUrl.includes('kids') ||
    imgUrl.includes('forest')
  ) {
    return '/kids-invitation';
  }


  return '/';
}
}
