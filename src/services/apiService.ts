import type {
  Applicant,
  Invoice,
  MaintenanceTicket,
  Property,
  RentTransaction,
  Tenant,
} from '@types';
import {
  mockApplicants,
  mockInvoices,
  mockMaintenanceTickets,
  mockProperties,
  mockTenants,
  mockTransactions,
} from '@utils/mockData';

type DelayConfig = {
  ms?: number;
};

const withLatency = async <T>(data: T, config: DelayConfig = {}) => {
  const { ms = 400 } = config;
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(data), ms);
  });
};

export const fetchProperties = async (): Promise<Property[]> => withLatency(mockProperties);

export const addProperty = async (property: Property) => {
  mockProperties = [...mockProperties, property];
  return withLatency(property);
};

export const updateProperty = async (property: Property) => {
  mockProperties = mockProperties.map((item) => (item.id === property.id ? property : item));
  return withLatency(property);
};

export const fetchTenants = async (): Promise<Tenant[]> => withLatency(mockTenants);

export const saveTenant = async (tenant: Tenant) => {
  const exists = mockTenants.find((item) => item.id === tenant.id);
  mockTenants = exists
    ? mockTenants.map((item) => (item.id === tenant.id ? tenant : item))
    : [...mockTenants, tenant];
  return withLatency(tenant);
};

export const fetchMaintenanceTickets = async (): Promise<MaintenanceTicket[]> =>
  withLatency(mockMaintenanceTickets);

export const saveMaintenanceTicket = async (ticket: MaintenanceTicket) => {
  const exists = mockMaintenanceTickets.find((item) => item.id === ticket.id);
  mockMaintenanceTickets = exists
    ? mockMaintenanceTickets.map((item) => (item.id === ticket.id ? ticket : item))
    : [...mockMaintenanceTickets, ticket];
  return withLatency(ticket);
};

export const fetchInvoices = async (): Promise<Invoice[]> => withLatency(mockInvoices);

export const saveInvoice = async (invoice: Invoice) => {
  const exists = mockInvoices.find((item) => item.id === invoice.id);
  mockInvoices = exists
    ? mockInvoices.map((item) => (item.id === invoice.id ? invoice : item))
    : [...mockInvoices, invoice];
  return withLatency(invoice);
};

export const deleteInvoice = async (invoiceId: string) => {
  mockInvoices = mockInvoices.filter((invoice) => invoice.id !== invoiceId);
  return withLatency(true);
};

export const fetchTransactions = async (): Promise<RentTransaction[]> => withLatency(mockTransactions);

export const fetchApplicants = async (): Promise<Applicant[]> => withLatency(mockApplicants);

export const saveApplicant = async (applicant: Applicant) => {
  const exists = mockApplicants.find((item) => item.id === applicant.id);
  mockApplicants = exists
    ? mockApplicants.map((item) => (item.id === applicant.id ? applicant : item))
    : [...mockApplicants, applicant];
  return withLatency(applicant);
};
