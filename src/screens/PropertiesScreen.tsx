import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { InputField } from '@components/InputField';
import { PrimaryButton } from '@components/PrimaryButton';
import { ListRow } from '@components/ListRow';
import { addProperty, fetchProperties, updateProperty } from '@services/apiService';
import type { Property } from '@types';

const PropertiesScreen = () => {
  const queryClient = useQueryClient();
  const { data: properties = [] } = useQuery({ queryKey: ['properties'], queryFn: fetchProperties });
  const [name, setName] = useState('New Building');
  const [address, setAddress] = useState('789 Oak St');
  const [unitCount, setUnitCount] = useState('3');

  const addMutation = useMutation({
    mutationFn: addProperty,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['properties'] }),
  });

  const updateMutation = useMutation({
    mutationFn: updateProperty,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['properties'] }),
  });

  const handleAdd = () => {
    const payload: Property = {
      id: `p-${Date.now()}`,
      name,
      address,
      unitCount: Number(unitCount),
      isActive: true,
      tenants: [],
    };
    addMutation.mutate(payload);
  };

  const toggleActive = (property: Property) => {
    updateMutation.mutate({ ...property, isActive: !property.isActive });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Properties</Text>
      <View style={styles.form}>
        <InputField label="Name" value={name} onChangeText={setName} />
        <InputField label="Address" value={address} onChangeText={setAddress} />
        <InputField label="Units" value={unitCount} onChangeText={setUnitCount} keyboardType="numeric" />
        <PrimaryButton label="Add property" onPress={handleAdd} loading={addMutation.isLoading} />
      </View>
      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListRow
            title={item.name}
            subtitle={`${item.address} • ${item.unitCount} units`}
            status={{ label: item.isActive ? 'active' : 'inactive', tone: item.isActive ? 'success' : 'warning' }}
            meta={`${item.tenants.length} tenants`}
            onPress={() => toggleActive(item)}
          />
        )}
        ListFooterComponent={<Text style={styles.caption}>Tap an item to toggle active/inactive.</Text>}
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
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 16,
    marginBottom: 16,
  },
  caption: {
    marginTop: 16,
    color: '#64748B',
  },
});

export default PropertiesScreen;
