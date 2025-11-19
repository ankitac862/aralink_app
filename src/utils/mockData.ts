import { Applicant, Invoice, MaintenanceTicket, Property, RentTransaction, Tenant, User, UserRole } from '@types';

export const mockUsers: User[] = [
  {
    id: 'u-1',
    name: 'Ava Landlord',
    email: 'ava@homes.com',
    role: UserRole.LANDLORD,
  },
  {
    id: 'u-2',
    name: 'Miles Manager',
    email: 'miles@homes.com',
    role: UserRole.MANAGER,
  },
  {
    id: 'u-3',
    name: 'Taylor Tenant',
    email: 'taylor@tenant.com',
    role: UserRole.TENANT,
  },
];

export let mockProperties: Property[] = [
  {
    id: 'p-1',
    name: 'Maple Street Flats',
    address: '123 Maple St, Denver, CO',
    unitCount: 4,
    isActive: true,
    tenants: ['t-1', 't-2'],
  },
  {
    id: 'p-2',
    name: 'Pine View Homes',
    address: '456 Pine Ave, Boulder, CO',
    unitCount: 6,
    isActive: true,
    tenants: ['t-3'],
  },
];

export let mockTenants: Tenant[] = [
  {
    id: 't-1',
    name: 'Jordan Fields',
    email: 'jordan@example.com',
    phone: '555-1111',
    propertyId: 'p-1',
    unit: 'Unit 1A',
    status: 'active',
    rentStatus: 'paid',
  },
  {
    id: 't-2',
    name: 'Sam Green',
    email: 'sam@example.com',
    phone: '555-2222',
    propertyId: 'p-1',
    unit: 'Unit 1B',
    status: 'active',
    rentStatus: 'due',
  },
  {
    id: 't-3',
    name: 'Morgan Lee',
    email: 'morgan@example.com',
    phone: '555-3333',
    propertyId: 'p-2',
    unit: 'Unit 2C',
    status: 'active',
    rentStatus: 'overdue',
  },
];

export let mockMaintenanceTickets: MaintenanceTicket[] = [
  {
    id: 'm-1',
    propertyId: 'p-1',
    tenantId: 't-1',
    description: 'Leaky faucet in bathroom',
    status: 'open',
    priority: 'medium',
  },
  {
    id: 'm-2',
    propertyId: 'p-2',
    description: 'Heating not working',
    status: 'in_progress',
    priority: 'high',
  },
];

export let mockInvoices: Invoice[] = [
  {
    id: 'inv-1',
    tenantId: 't-1',
    amount: 1450,
    dueDate: '2024-07-01',
    status: 'paid',
  },
  {
    id: 'inv-2',
    tenantId: 't-2',
    amount: 1525,
    dueDate: '2024-07-01',
    status: 'unpaid',
  },
];

export let mockTransactions: RentTransaction[] = [
  {
    id: 'txn-1',
    tenantId: 't-1',
    amount: 1450,
    paidOn: '2024-06-28',
    method: 'ach',
  },
  {
    id: 'txn-2',
    tenantId: 't-3',
    amount: 1300,
    paidOn: '2024-06-26',
    method: 'card',
  },
];

export let mockApplicants: Applicant[] = [
  {
    id: 'a-1',
    name: 'Jamie Rivers',
    email: 'jamie@potential.com',
    phone: '555-4444',
    unitPreference: 'Maple Street 2B',
    stage: 'screening',
  },
  {
    id: 'a-2',
    name: 'Bailey North',
    email: 'bailey@potential.com',
    phone: '555-5555',
    unitPreference: 'Pine View 4A',
    stage: 'new',
  },
];
