import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { InputField } from '@components/InputField';
import { PrimaryButton } from '@components/PrimaryButton';
import { ListRow } from '@components/ListRow';
import { InfoCard } from '@components/InfoCard';
import { fetchInvoices, fetchTransactions, saveInvoice, deleteInvoice } from '@services/apiService';
import { currencyFormatter, formatDate } from '@utils/formatters';
import type { Invoice } from '@types';

const AccountingScreen = () => {
  const queryClient = useQueryClient();
  const { data: invoices = [] } = useQuery({ queryKey: ['invoices'], queryFn: fetchInvoices });
  const { data: transactions = [] } = useQuery({ queryKey: ['transactions'], queryFn: fetchTransactions });

  const [tenantId, setTenantId] = useState('t-1');
  const [amount, setAmount] = useState('1500');
  const [dueDate, setDueDate] = useState('2024-08-01');

  const saveMutation = useMutation({
    mutationFn: saveInvoice,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['invoices'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteInvoice,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['invoices'] }),
  });

  const handleSave = () => {
    const payload: Invoice = {
      id: `inv-${Date.now()}`,
      tenantId,
      amount: Number(amount),
      dueDate,
      status: 'unpaid',
    };
    saveMutation.mutate(payload);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Accounting</Text>
      <InfoCard title="Collections" subtitle="Last 30 days" value={currencyFormatter(transactions.reduce((sum, txn) => sum + txn.amount, 0))}>
        <Text style={styles.caption}>Receipt scanning placeholder (S3 upload coming soon).</Text>
      </InfoCard>
      <View style={styles.form}>
        <InputField label="Tenant ID" value={tenantId} onChangeText={setTenantId} />
        <InputField label="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
        <InputField label="Due date" value={dueDate} onChangeText={setDueDate} />
        <PrimaryButton label="Add invoice" onPress={handleSave} loading={saveMutation.isLoading} />
      </View>
      <Text style={styles.sectionTitle}>Invoices</Text>
      <FlatList
        data={invoices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.invoiceRow}>
            <ListRow
              title={currencyFormatter(item.amount)}
              subtitle={`Due ${formatDate(item.dueDate)}`}
              status={{ label: item.status, tone: item.status === 'paid' ? 'success' : 'warning' }}
            />
            <PrimaryButton label="Delete" onPress={() => deleteMutation.mutate(item.id)} />
          </View>
        )}
      />
      <Text style={styles.sectionTitle}>Recent rent payments</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListRow title={currencyFormatter(item.amount)} subtitle={`${formatDate(item.paidOn)} • ${item.method.toUpperCase()}`} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 12,
  },
  form: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  caption: {
    marginTop: 8,
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  invoiceRow: {
    marginBottom: 8,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 8,
  },
});

export default AccountingScreen;
