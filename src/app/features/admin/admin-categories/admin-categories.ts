import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Category } from '../../../core/models/types';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-categories.html',
  styleUrl: './admin-categories.scss'
})
export class AdminCategoriesComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly fb = inject(FormBuilder);

  readonly categories = signal<Category[]>([]);
  readonly loading = signal<boolean>(true);
  readonly submitting = signal<boolean>(false);
  
  // Modal / form state
  readonly isModalOpen = signal<boolean>(false);
  readonly editingCategory = signal<Category | null>(null);
  
  categoryForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
  }

  initForm(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  loadCategories(): void {
    this.loading.set(true);
    this.apiService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  openCreateModal(): void {
    this.editingCategory.set(null);
    this.categoryForm.reset();
    this.isModalOpen.set(true);
  }

  openEditModal(category: Category): void {
    this.editingCategory.set(category);
    this.categoryForm.reset({
      name: category.name
    });
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.editingCategory.set(null);
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    const name = this.categoryForm.value.name;
    const editing = this.editingCategory();

    if (editing) {
      // Update
      this.apiService.updateCategory(editing.id, name).subscribe({
        next: () => {
          this.submitting.set(false);
          this.closeModal();
          this.loadCategories();
        },
        error: () => {
          this.submitting.set(false);
          alert('Ошибка при обновлении категории.');
        }
      });
    } else {
      // Create
      this.apiService.createCategory(name).subscribe({
        next: () => {
          this.submitting.set(false);
          this.closeModal();
          this.loadCategories();
        },
        error: () => {
          this.submitting.set(false);
          alert('Ошибка при создании категории.');
        }
      });
    }
  }

  deleteCategory(id: number): void {
    if (confirm('Вы действительно хотите удалить эту категорию? Связанные шаблоны могут перестать отображаться.')) {
      this.apiService.deleteCategory(id).subscribe({
        next: () => {
          this.loadCategories();
        },
        error: (err) => {
          alert('Не удалось удалить категорию. Возможно, к ней привязаны активные шаблоны.');
        }
      });
    }
  }
}
