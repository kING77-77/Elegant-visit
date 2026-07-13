import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Template, Order, DashboardStats } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://elegantvisit-backend.onrender.com/api';

  // Categories API
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/categories/${id}`);
  }

  createCategory(name: string): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/categories`, { name });
  }

  updateCategory(id: number, name: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/categories/${id}`, { name });
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/categories/${id}`);
  }

  // Templates API
  getTemplates(categoryId?: number | null, search?: string | null): Observable<Template[]> {
    let params = new HttpParams();
    if (categoryId !== undefined && categoryId !== null) {
      params = params.set('categoryId', categoryId.toString());
    }
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<Template[]>(`${this.apiUrl}/templates`, { params });
  }

  getTemplateById(id: number): Observable<Template> {
    return this.http.get<Template>(`${this.apiUrl}/templates/${id}`);
  }

  createTemplate(template: Partial<Template>): Observable<Template> {
    return this.http.post<Template>(`${this.apiUrl}/templates`, template);
  }

  updateTemplate(id: number, template: Partial<Template>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/templates/${id}`, template);
  }

  deleteTemplate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/templates/${id}`);
  }

  // Orders API
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/orders/${id}`);
  }

  createOrder(order: {
    customerName: string;
    phone: string;
    email: string;
    eventType: string;
    eventDate: string;
    comment: string;
    templateId: number;
  }): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, order);
  }

  updateOrderStatus(id: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/orders/${id}/status`, { status });
  }

  // Stats API
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/stats`);
  }
}
