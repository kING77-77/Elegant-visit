export interface Category {
  id: number;
  name: string;
}

export interface TemplatePrices {
  en: number;
  ru: number;
  hy: number;
  ka: number;
}

export interface Template {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  createdAt: string;
  prices: TemplatePrices;
}

export interface Order {
  id: number;
  customerName: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  comment: string;
  templateId: number;
  status: string;
  createdAt: string;
  template?: Template;
}

export interface AdminDto {
  username: string;
  token: string;
}

export interface PopularTemplate {
  templateId: number;
  title: string;
  orderCount: number;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  eventDistribution: { [key: string]: number };
  popularTemplates: PopularTemplate[];
}

export interface TelegramStatus {
  connected: boolean;
  username?: string;
  connectedAt?: string;
}

export interface TelegramConnectLink {
  url: string;
  expiresAt: string;
}
