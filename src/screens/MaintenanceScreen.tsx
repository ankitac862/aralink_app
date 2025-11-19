import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { InputField } from '@components/InputField';
import { PrimaryButton } from '@components/PrimaryButton';
import { ListRow } from '@components/ListRow';
import { fetchMaintenanceTickets, saveMaintenanceTicket } from '@services/apiService';
import { uploadToS3 } from '@services/storageService';
import type { MaintenanceTicket } from '@types';

const statuses: MaintenanceTicket['status'][] = ['open', 'in_progress', 'resolved'];

const MaintenanceScreen = () => {
  const queryClient = useQueryClient();
  const { data: tickets = [] } = useQuery({ queryKey: ['tickets'], queryFn: fetchMaintenanceTickets });
  const [description, setDescription] = useState('Leaky sink in kitchen');
  const [priority, setPriority] = useState<MaintenanceTicket['priority']>('medium');

  const mutation = useMutation({
    mutationFn: saveMaintenanceTicket,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tickets'] }),
  });

  const handleSubmit = async () => {
    const media = await uploadToS3({ name: `ticket-${Date.now()}.jpg`, type: 'image' });
    const payload: MaintenanceTicket = {
      id: `m-${Date.now()}`,
      propertyId: 'p-1',
      description,
      priority,
      status: 'open',
      media: media.url,
    };
    mutation.mutate(payload);
  };

  const advanceStatus = (ticket: MaintenanceTicket) => {
    const index = statuses.indexOf(ticket.status);
    const nextStatus = statuses[(index + 1) % statuses.length];
    mutation.mutate({ ...ticket, status: nextStatus });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Maintenance</Text>
      <View style={styles.form}>
        <InputField label="Describe issue" value={description} onChangeText={setDescription} />
        <InputField label="Priority (low/medium/high)" value={priority} onChangeText={(text) => setPriority(text as MaintenanceTicket['priority'])} />
        <PrimaryButton label="Submit ticket" onPress={handleSubmit} loading={mutation.isLoading} />
      </View>
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.ticket}>
            <ListRow
              title={item.description}
              subtitle={`Priority: ${item.priority}`}
              status={{
                label: item.status.replace('_', ' '),
                tone: item.status === 'resolved' ? 'success' : item.status === 'open' ? 'danger' : 'warning',
              }}
            />
            <PrimaryButton label="Advance status" onPress={() => advanceStatus(item)} />
          </View>
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
  ticket: {
    marginBottom: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
  },
});

export default MaintenanceScreen;
