import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class TemplateDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);
  private readonly fb = inject(FormBuilder);
  public readonly translationService = inject(TranslationService);

  readonly template = signal<Template | null>(null);
  readonly loading = signal<boolean>(true);
  readonly errorMsg = signal<string | null>(null);
  
  // Modal state
  readonly isModalOpen = signal<boolean>(false);
  readonly orderSuccess = signal<boolean>(false);
  readonly submitting = signal<boolean>(false);
  
  orderForm!: FormGroup;

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

  initForm(): void {
    this.orderForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-()]{7,20}$/)]],
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
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  onSubmit(): void {
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
      error: (err) => {
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
}
