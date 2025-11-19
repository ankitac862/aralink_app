import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { InputField } from '@components/InputField';
import { PrimaryButton } from '@components/PrimaryButton';
import { ListRow } from '@components/ListRow';
import { fetchTenants, saveTenant } from '@services/apiService';
import type { Tenant } from '@types';

const TenantsScreen = () => {
  const queryClient = useQueryClient();
  const { data: tenants = [] } = useQuery({ queryKey: ['tenants'], queryFn: fetchTenants });
  const [name, setName] = useState('New Tenant');
  const [unit, setUnit] = useState('Unit 3A');
  const [email, setEmail] = useState('tenant@example.com');
  const [phone, setPhone] = useState('555-9876');

  const mutation = useMutation({
    mutationFn: saveTenant,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tenants'] }),
  });

  const handleSave = () => {
    const payload: Tenant = {
      id: `t-${Date.now()}`,
      name,
      email,
      phone,
      propertyId: 'p-1',
      unit,
      status: 'active',
      rentStatus: 'paid',
    };
    mutation.mutate(payload);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tenants</Text>
      <View style={styles.form}>
        <InputField label="Name" value={name} onChangeText={setName} />
        <InputField label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <InputField label="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <InputField label="Unit" value={unit} onChangeText={setUnit} />
        <PrimaryButton label="Save tenant" onPress={handleSave} loading={mutation.isLoading} />
      </View>
      <FlatList
        data={tenants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListRow
            title={item.name}
            subtitle={`${item.unit} • ${item.email}`}
            status={{
              label: item.rentStatus,
              tone: item.rentStatus === 'paid' ? 'success' : item.rentStatus === 'due' ? 'warning' : 'danger',
            }}
          />
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
});

export default TenantsScreen;
