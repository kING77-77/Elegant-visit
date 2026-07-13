import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Template, Category } from '../../../core/models/types';

@Component({
  selector: 'app-admin-templates',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-templates.html',
  styleUrl: './admin-templates.scss'
})
export class AdminTemplatesComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly fb = inject(FormBuilder);

  readonly templates = signal<Template[]>([]);
  readonly categories = signal<Category[]>([]);
  readonly loading = signal<boolean>(true);
  readonly submitting = signal<boolean>(false);
  
  // Modal / form state
  readonly isModalOpen = signal<boolean>(false);
  readonly editingTemplate = signal<Template | null>(null);
  
  templateForm!: FormGroup;

  // Pre-configured generated assets that can be easily picked
  readonly imagePresets = [
    { label: 'Золотая роскошь (Свадьба)', value: '/images/wedding_luxury.jpg' },
    { label: 'Бохо шик (Свадьба)', value: '/images/wedding_boho.jpg' },
    { label: 'Минимализм (Свадьба)', value: '/images/wedding_minimal.jpg' },
    { label: 'Строгий корпоративный (Корпоратив)', value: '/images/corporate_classic.jpg' },
    { label: 'Неоновая вечеринка (День рождения)', value: '/images/birthday_neon.jpg' },
    { label: 'Сказочный лес (Детский праздник)', value: '/images/kids_forest.jpg' }
  ];

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
    this.loadTemplates();
  }

  initForm(): void {
    this.templateForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['/images/wedding_luxury.jpg', [Validators.required]],
      categoryId: [null, [Validators.required]],
      prices: this.fb.group({
        en: [0, [Validators.required, Validators.min(0)]],
        ru: [0, [Validators.required, Validators.min(0)]],
        hy: [0, [Validators.required, Validators.min(0)]],
        ka: [0, [Validators.required, Validators.min(0)]]
      })
    });
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
        if (data.length > 0 && !this.templateForm.get('categoryId')?.value) {
          this.templateForm.patchValue({ categoryId: data[0].id });
        }
      }
    });
  }

  loadTemplates(): void {
    this.loading.set(true);
    this.apiService.getTemplates().subscribe({
      next: (data) => {
        this.templates.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  getCategoryName(id: number): string {
    const category = this.categories().find(c => c.id === id);
    return category ? category.name : 'Неизвестно';
  }

  openCreateModal(): void {
    this.editingTemplate.set(null);
    this.templateForm.reset({
      price: 0,
      imageUrl: '/images/wedding_luxury.jpg',
      categoryId: this.categories().length > 0 ? this.categories()[0].id : null,
      prices: {
        en: 0,
        ru: 0,
        hy: 0,
        ka: 0
      }
    });
    this.isModalOpen.set(true);
  }

  openEditModal(template: Template): void {
    this.editingTemplate.set(template);
    this.templateForm.reset({
      title: template.title,
      description: template.description,
      price: template.price,
      imageUrl: template.imageUrl,
      categoryId: template.categoryId,
      prices: {
        en: template.prices?.en || 0,
        ru: template.prices?.ru || 0,
        hy: template.prices?.hy || 0,
        ka: template.prices?.ka || 0
      }
    });
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.editingTemplate.set(null);
  }

  onSubmit(): void {
    if (this.templateForm.invalid) {
      this.templateForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    const formVal = this.templateForm.value;
    
    const payload: Partial<Template> = {
      title: formVal.title,
      description: formVal.description,
      price: Number(formVal.price),
      imageUrl: formVal.imageUrl,
      categoryId: Number(formVal.categoryId),
      prices: {
        en: Number(formVal.prices.en),
        ru: Number(formVal.prices.ru),
        hy: Number(formVal.prices.hy),
        ka: Number(formVal.prices.ka)
      }
    };

    const editing = this.editingTemplate();

    if (editing) {
      this.apiService.updateTemplate(editing.id, payload).subscribe({
        next: () => {
          this.submitting.set(false);
          this.closeModal();
          this.loadTemplates();
        },
        error: () => {
          this.submitting.set(false);
          alert('Ошибка при обновлении шаблона.');
        }
      });
    } else {
      this.apiService.createTemplate(payload).subscribe({
        next: () => {
          this.submitting.set(false);
          this.closeModal();
          this.loadTemplates();
        },
        error: () => {
          this.submitting.set(false);
          alert('Ошибка при создании шаблона.');
        }
      });
    }
  }

  deleteTemplate(id: number): void {
    if (confirm('Вы действительно хотите удалить этот шаблон?')) {
      this.apiService.deleteTemplate(id).subscribe({
        next: () => {
          this.loadTemplates();
        },
        error: () => {
          alert('Ошибка при удалении шаблона.');
        }
      });
    }
  }
}
