import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { InputField } from '@components/InputField';
import { PrimaryButton } from '@components/PrimaryButton';
import { ListRow } from '@components/ListRow';
import { fetchApplicants, saveApplicant } from '@services/apiService';
import type { Applicant } from '@types';

const stages: Applicant['stage'][] = ['new', 'screening', 'approved', 'rejected'];

const ApplicantsScreen = () => {
  const queryClient = useQueryClient();
  const { data: applicants = [] } = useQuery({ queryKey: ['applicants'], queryFn: fetchApplicants });
  const [name, setName] = useState('New Applicant');
  const [email, setEmail] = useState('applicant@example.com');
  const [phone, setPhone] = useState('555-8888');

  const mutation = useMutation({
    mutationFn: saveApplicant,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['applicants'] }),
  });

  const handleAdd = () => {
    const payload: Applicant = {
      id: `a-${Date.now()}`,
      name,
      email,
      phone,
      unitPreference: 'Any',
      stage: 'new',
    };
    mutation.mutate(payload);
  };

  const advanceStage = (applicant: Applicant) => {
    const index = stages.indexOf(applicant.stage);
    const nextStage = stages[Math.min(index + 1, stages.length - 1)];
    mutation.mutate({ ...applicant, stage: nextStage });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Applicants</Text>
      <View style={styles.form}>
        <InputField label="Name" value={name} onChangeText={setName} />
        <InputField label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <InputField label="Phone" value={phone} onChangeText={setPhone} />
        <PrimaryButton label="Add applicant" onPress={handleAdd} loading={mutation.isLoading} />
      </View>
      <FlatList
        data={applicants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <ListRow title={item.name} subtitle={`${item.email} • ${item.phone}`} status={{ label: item.stage }} />
            <PrimaryButton label="Advance" onPress={() => advanceStage(item)} />
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
  row: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
});

export default ApplicantsScreen;
