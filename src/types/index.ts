export enum UserRole {
  LANDLORD = 'landlord',
  MANAGER = 'manager',
  TENANT = 'tenant',
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type Property = {
  id: string;
  name: string;
  address: string;
  unitCount: number;
  isActive: boolean;
  tenants: string[];
};

export type Tenant = {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  unit: string;
  status: 'active' | 'inactive';
  rentStatus: 'paid' | 'due' | 'overdue';
};

export type MaintenanceTicket = {
  id: string;
  propertyId: string;
  tenantId?: string;
  description: string;
  media?: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
};

export type Invoice = {
  id: string;
  tenantId: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'overdue';
};

export type Applicant = {
  id: string;
  name: string;
  email: string;
  phone: string;
  unitPreference: string;
  stage: 'new' | 'screening' | 'approved' | 'rejected';
};

export type RentTransaction = {
  id: string;
  tenantId: string;
  amount: number;
  paidOn: string;
  method: 'ach' | 'card' | 'cash';
};
