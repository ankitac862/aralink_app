import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { TileButton } from '@components/TileButton';
import { InfoCard } from '@components/InfoCard';
import { StatusPill } from '@components/StatusPill';
import { fetchMaintenanceTickets, fetchProperties, fetchTenants } from '@services/apiService';
import { useAuth } from '@contexts/AuthContext';
import { RootStackParamList } from '@navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserRole } from '@types';

const DashboardScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const { data: properties = [] } = useQuery({ queryKey: ['properties'], queryFn: fetchProperties });
  const { data: tenants = [] } = useQuery({ queryKey: ['tenants'], queryFn: fetchTenants });
  const { data: tickets = [] } = useQuery({ queryKey: ['tickets'], queryFn: fetchMaintenanceTickets });

  const landlordView = (
    <>
      <View style={styles.tilesRow}>
        <TileButton title="My Properties" subtitle={`${properties.length} active`} onPress={() => navigation.navigate('Properties')} />
        <TileButton title="Tenants" subtitle={`${tenants.length} total`} onPress={() => navigation.navigate('Tenants')} />
      </View>
      <View style={styles.tilesRow}>
        <TileButton title="Maintenance" subtitle={`${tickets.length} open`} onPress={() => navigation.navigate('Maintenance')} />
        <TileButton title="Applicants" subtitle="Manage leads" onPress={() => navigation.navigate('Applicants')} />
      </View>
      <InfoCard title="At a glance" subtitle="Open maintenance tickets" value={`${tickets.filter((t) => t.status !== 'resolved').length}`}>
        {tickets.slice(0, 3).map((ticket) => (
          <View key={ticket.id} style={styles.inlineRow}>
            <Text style={{ flex: 1 }}>{ticket.description}</Text>
            <StatusPill label={ticket.status.replace('_', ' ')} tone={ticket.status === 'open' ? 'danger' : 'warning'} />
          </View>
        ))}
      </InfoCard>
    </>
  );

  const tenantRecord = tenants.find((tenant) => tenant.email === user?.email) ?? tenants[0];

  const tenantView = (
    <>
      <InfoCard title="Rent status" subtitle={tenantRecord?.unit ?? ''} value={tenantRecord?.rentStatus ?? 'paid'} />
      <InfoCard title="Maintenance">
        {tickets.slice(0, 2).map((ticket) => (
          <View key={ticket.id} style={styles.inlineRow}>
            <Text style={{ flex: 1 }}>{ticket.description}</Text>
            <StatusPill
              label={ticket.status.replace('_', ' ')}
              tone={ticket.status === 'resolved' ? 'success' : 'warning'}
            />
          </View>
        ))}
        <TileButton title="Submit request" onPress={() => navigation.navigate('Maintenance')} />
      </InfoCard>
    </>
  );

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <Text style={styles.welcome}>Hi {user?.name ?? 'there'} 👋</Text>
      <Text style={styles.caption}>Here's what's happening across your rentals</Text>
      {user?.role === UserRole.TENANT ? tenantView : landlordView}
      {user?.role !== UserRole.TENANT && (
        <TileButton title="Accounting" subtitle="Invoices & rent" onPress={() => navigation.navigate('Accounting')} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F1F5F9',
  },
  welcome: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
  },
  caption: {
    marginTop: 8,
    color: '#475569',
    marginBottom: 24,
  },
  tilesRow: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 12,
  },
});

export default DashboardScreen;
