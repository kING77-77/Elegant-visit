import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { Order, Template } from '../../../core/models/types';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.scss'
})
export class AdminOrdersComponent implements OnInit {
  private readonly apiService = inject(ApiService);

  readonly orders = signal<Order[]>([]);
  readonly templates = signal<Template[]>([]);
  readonly loading = signal<boolean>(true);
  
  // Modal / detailed view
  readonly selectedOrder = signal<Order | null>(null);
  readonly isDetailsOpen = signal<boolean>(false);

  readonly statuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

  ngOnInit(): void {
    this.loadTemplates();
    this.loadOrders();
  }

  loadTemplates(): void {
    this.apiService.getTemplates().subscribe({
      next: (data) => {
        this.templates.set(data);
      }
    });
  }

  loadOrders(): void {
    this.loading.set(true);
    this.apiService.getOrders().subscribe({
      next: (data) => {
        // Sort orders descending by creation date
        this.orders.set(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  getTemplateTitle(templateId: number): string {
    const template = this.templates().find(t => t.id === templateId);
    return template ? template.title : `Шаблон #${templateId}`;
  }

  getTemplatePrice(templateId: number): number {
    const template = this.templates().find(t => t.id === templateId);
    return template ? template.price : 0;
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'Pending': return 'Ожидает';
      case 'Confirmed': return 'Подтвержден';
      case 'Completed': return 'Выполнен';
      case 'Cancelled': return 'Отменен';
      default: return status;
    }
  }

  updateStatus(id: number, newStatus: string): void {
    this.apiService.updateOrderStatus(id, newStatus).subscribe({
      next: () => {
        // Update local state
        this.orders.update(prev => prev.map(order => 
          order.id === id ? { ...order, status: newStatus } : order
        ));
        
        // If details modal is open for this order, update it too
        const currentSelected = this.selectedOrder();
        if (currentSelected && currentSelected.id === id) {
          this.selectedOrder.set({ ...currentSelected, status: newStatus });
        }
      },
      error: () => {
        alert('Ошибка при обновлении статуса заказа.');
      }
    });
  }

  viewDetails(order: Order): void {
    this.selectedOrder.set(order);
    this.isDetailsOpen.set(true);
  }

  closeDetails(): void {
    this.isDetailsOpen.set(false);
    this.selectedOrder.set(null);
  }
}
