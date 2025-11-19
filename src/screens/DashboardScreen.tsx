import React, { useMemo } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchProperties, fetchTenants } from '@services/apiService';
import { useAuth } from '@contexts/AuthContext';
import { RootStackParamList } from '@navigation/AppNavigator';
import { UserRole } from '@types';

const tenantAnnouncements = [
  {
    id: 'ann-1',
    title: 'Pool Maintenance This Friday',
    body: 'The community pool will be closed for scheduled maintenance this Friday, June 28th.',
    date: 'June 24, 2024',
    icon: 'pool',
  },
  {
    id: 'ann-2',
    title: 'Pest Control Notice',
    body: 'Quarterly pest control service is scheduled for all units next Monday. Please prepare accordingly.',
    date: 'June 22, 2024',
    icon: 'bug-report',
  },
];

const landlordActivities = [
  {
    id: 'act-1',
    title: 'Rent paid for Unit 5B',
    subtitle: 'John Smith - $1,500',
    icon: 'paid',
    tone: '#16A34A',
    time: '1h ago',
  },
  {
    id: 'act-2',
    title: 'New maintenance request',
    subtitle: 'Unit 3A - Leaky Faucet',
    icon: 'construction',
    tone: '#F59E0B',
    time: '3h ago',
  },
];

const DashboardScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const { data: properties = [] } = useQuery({ queryKey: ['properties'], queryFn: fetchProperties });
  const { data: tenants = [] } = useQuery({ queryKey: ['tenants'], queryFn: fetchTenants });

  const tenantRecord = tenants.find((tenant) => tenant.email === user?.email) ?? tenants[0];
  const tenantProperty = useMemo(
    () => properties.find((prop) => prop.id === tenantRecord?.propertyId),
    [properties, tenantRecord?.propertyId],
  );

  const isTenant = user?.role === UserRole.TENANT;

  const renderTenantView = () => {
    const rentStatus = tenantRecord?.rentStatus ?? 'due';
    const rentTone = rentStatus === 'paid' ? '#50E3C2' : rentStatus === 'overdue' ? '#D0021B' : '#F5A623';
    const rentMessage =
      rentStatus === 'paid' ? 'Rent is Paid' : rentStatus === 'overdue' ? 'Rent is Overdue' : 'Rent is Due Soon';

    return (
      <View style={[styles.screen, styles.tenantScreen]}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.tenantHeader}>
            <View style={styles.tenantHeaderLeft}>
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADhLH3zQiYUJHdTOhxxUo445nL-ZVtp52_RiAuoPgEdqUXQ2Ma7RUMwF1femxYkkDdJkjc32clpdh2ImNFBpadotyAYb_GNEjP5JBaUUghgZJuH8zY1gRK5CwxaA5iwCFZvoWfNhFsE7_BIremMdp1T-9dHDab6DHg7YO5jaDzI1ZLsfAXlI9ACMV4Witk7ooDYw1XIzmmZsOONJLaW4BKSt0J908fHv_lg1DvjKufynx-WO7mVOs6h7wgcia6dIsJq3isofJAjD8',
                }}
                style={styles.avatar}
              />
              <Text style={styles.tenantGreeting}>Hello, {user?.name ?? 'John'}</Text>
            </View>
            <Pressable style={styles.notificationButton}>
              <MaterialIcons name="notifications" size={22} color="#1D1D1F" />
              <View style={styles.dot} />
            </Pressable>
          </View>

          <View style={styles.propertyCard}>
            <ImageBackground
              source={{
                uri:
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuCBu2LsSDVlWQmFew3jxJv-HUQdRVv-KNePYkANjKJ-lJF6tXCeDoqMI9BNT5j1KNR-3KXrUx2hbeqYs1F-jVNuo78OQ38sqeixabQ2trCoBphO26YIaAzEe2jsnAppwGIOWRpkeBW2H9_rfVBsIpQuOcTyCf1auKfpxArF5NoSHikY1udbOfl2NQP4Witk7ooDYw1XIzmmZsOONJLaW4BKSt0J908fHv_lg1DvjKufynx-WO7mVOs6h7wgcia6dIsJq3isofJAjD8',
              }}
              style={styles.propertyImage}
              imageStyle={{ borderRadius: 16 }}
            />
            <View style={styles.propertyDetails}>
              <Text style={styles.subtleLabel}>YOUR HOME</Text>
              <Text style={styles.propertyTitle}>{tenantProperty?.name ?? '123 Main Street, Apt 4B'}</Text>
              <Text style={styles.propertySubtitle}>{tenantProperty?.address ?? 'Springfield, IL 62704'}</Text>
            </View>
          </View>

          <View style={styles.rentCard}>
            <Text style={styles.subtleLabel}>RENT STATUS</Text>
            <View style={styles.rowBetween}>
              <View style={styles.rowCenter}>
                <View style={[styles.statusDot, { backgroundColor: rentTone }]} />
                <Text style={styles.rentTitle}>{rentMessage}</Text>
              </View>
            </View>
            <View style={[styles.rowBetween, styles.rentFooter]}>
              <Text style={styles.rentSubtitle}>$1,200.00 due on July 1st</Text>
              <Pressable style={styles.payButton}>
                <Text style={styles.payButtonLabel}>Pay Now</Text>
              </Pressable>
            </View>
          </View>

          <Pressable style={styles.primaryCta} onPress={() => navigation.navigate('Maintenance')}>
            <MaterialIcons name="add-circle" size={20} color="#FFFFFF" />
            <Text style={styles.primaryCtaLabel}>Submit Maintenance Request</Text>
          </Pressable>

          <View style={styles.quickLinks}>
            {[{ label: 'View Lease', icon: 'description' }, { label: 'Contact Us', icon: 'support-agent' }, { label: 'Documents', icon: 'folder-open' }, { label: 'Community Rules', icon: 'gavel' }].map((link) => (
              <Pressable key={link.label} style={styles.quickLinkCard}>
                <View style={styles.quickLinkIconWrapper}>
                  <MaterialIcons name={link.icon as any} size={22} color="#4A90E2" />
                </View>
                <Text style={styles.quickLinkLabel}>{link.label}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.announcementsHeaderRow}>
            <Text style={styles.sectionTitle}>Announcements</Text>
          </View>
          <View style={styles.announcementList}>
            {tenantAnnouncements.map((item) => (
              <View key={item.id} style={styles.announcementCard}>
                <View style={[styles.quickLinkIconWrapper, { backgroundColor: '#E5EDFF' }]}>
                  <MaterialIcons name={item.icon as any} size={22} color="#4A90E2" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.announcementTitle}>{item.title}</Text>
                  <Text style={styles.announcementBody}>{item.body}</Text>
                  <Text style={styles.announcementDate}>{item.date}</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={{ height: 120 }} />
        </ScrollView>

        <View style={styles.bottomNav}>
          {[
            { icon: 'dashboard', label: 'Dashboard', active: true },
            { icon: 'payment', label: 'Payments', active: false },
            { icon: 'construction', label: 'Maintenance', active: false },
            { icon: 'chat-bubble', label: 'Messages', active: false },
          ].map((item) => (
            <View key={item.label} style={styles.bottomNavItem}>
              <MaterialIcons
                name={item.icon as any}
                size={22}
                color={item.active ? '#4A90E2' : '#8A8A8F'}
              />
              <Text style={[styles.bottomNavLabel, item.active && styles.bottomNavLabelActive]}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderLandlordView = () => {
    return (
      <View style={[styles.screen, styles.landlordScreen]}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.landlordCard}>
            <View style={styles.landlordHeader}>
              <View style={styles.rowCenter}>
                <View style={styles.landlordAvatar}>
                  <MaterialIcons name="person" size={22} color="#101c22" />
                </View>
                <View>
                  <Text style={styles.landlordGreeting}>Hello, {user?.name ?? 'Taylor'}</Text>
                  <Text style={styles.portfolioLabel}>Portfolio Overview</Text>
                </View>
              </View>
              <MaterialIcons name="more-vert" size={22} color="#8E8E93" style={{ transform: [{ rotate: '-90deg' }] }} />
            </View>
            <View style={styles.portfolioBadge}>
              <Text style={styles.portfolioBadgeText}>10 Active Leases • 83% Occupancy</Text>
            </View>
          </View>

          <View style={styles.rentCollectionCard}>
            <Text style={styles.rentCollectionTitle}>Rent Collection</Text>
            <Text style={styles.rentCollectionSubtitle}>For July 2024</Text>
            <View style={styles.rentSummaryRow}>
              <View style={styles.rentSummaryCircle} />
              <View style={styles.rentSummaryTextBlock}>
                <Text style={styles.rentCollectionAmount}>$21,250</Text>
                <Text style={styles.rentCollectionCaption}>out of $25,000</Text>
                <View style={styles.legendRow}>
                  {[{ label: 'Paid', color: '#22C55E' }, { label: 'Pending', color: '#F59E0B' }, { label: 'Overdue', color: '#93C5FD' }].map((item) => (
                    <View key={item.label} style={styles.legendItem}>
                      <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                      <Text style={styles.legendLabel}>{item.label}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>

          <View style={styles.quickGrid}>
            {[
              { label: 'Properties', icon: 'apartment' },
              { label: 'Tenants', icon: 'group' },
              { label: 'Leases', icon: 'gavel' },
              { label: 'Accounting', icon: 'request-quote' },
              { label: 'Maintenance', icon: 'construction' },
              { label: 'Reports', icon: 'description' },
            ].map((item) => (
              <Pressable key={item.label} style={styles.quickGridCard}>
                <MaterialIcons name={item.icon as any} size={22} color="#4A90E2" />
                <Text style={styles.quickGridLabel}>{item.label}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.recentActivitySection}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            {landlordActivities.map((activity) => (
              <View key={activity.id} style={styles.activityCard}>
                <View style={[styles.activityIcon, { backgroundColor: `${activity.tone}1A` }]}>  
                  <MaterialIcons name={activity.icon as any} size={20} color={activity.tone} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activitySubtitle}>{activity.subtitle}</Text>
                </View>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            ))}
          </View>
          <View style={{ height: 140 }} />
        </ScrollView>

        <Pressable style={styles.fab}>
          <MaterialIcons name="add" size={28} color="#FFFFFF" />
        </Pressable>

        <View style={styles.bottomNav}>
          {[
            { icon: 'dashboard', label: 'Dashboard', active: true },
            { icon: 'chat-bubble', label: 'Messages', active: false },
            { icon: 'calendar-today', label: 'Calendar', active: false },
            { icon: 'person', label: 'Profile', active: false },
          ].map((item) => (
            <View key={item.label} style={styles.bottomNavItem}>
              <MaterialIcons
                name={item.icon as any}
                size={22}
                color={item.active ? '#4A90E2' : '#8E8E93'}
              />
              <Text style={[styles.bottomNavLabel, item.active && styles.bottomNavLabelActive]}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return isTenant ? renderTenantView() : renderLandlordView();
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  tenantScreen: {
    backgroundColor: '#F4F6F8',
  },
  landlordScreen: {
    backgroundColor: '#F2F2F7',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  tenantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  tenantHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  tenantGreeting: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D1D1F',
  },
  notificationButton: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    top: 8,
    right: 8,
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#D0021B',
    borderWidth: 2,
    borderColor: '#F4F6F8',
  },
  propertyCard: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  propertyImage: {
    width: '100%',
    height: 160,
  },
  propertyDetails: {
    padding: 14,
    gap: 4,
  },
  subtleLabel: {
    color: '#8A8A8F',
    fontSize: 12,
    letterSpacing: 0.2,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D1D1F',
  },
  propertySubtitle: {
    color: '#6B7280',
    fontSize: 14,
  },
  rentCard: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rentTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D1D1F',
  },
  rentSubtitle: {
    color: '#6B7280',
    fontSize: 14,
  },
  rentFooter: {
    marginTop: 10,
  },
  statusDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
  },
  payButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  payButtonLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  primaryCta: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },
  primaryCtaLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  quickLinks: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickLinkCard: {
    width: '22%',
    alignItems: 'center',
    gap: 8,
  },
  quickLinkIconWrapper: {
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7F0FF',
  },
  quickLinkLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#1D1D1F',
    fontWeight: '600',
  },
  announcementsHeaderRow: {
    marginTop: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D1D1F',
  },
  announcementList: {
    gap: 12,
  },
  announcementCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  announcementTitle: {
    fontWeight: '700',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  announcementBody: {
    color: '#6B7280',
    fontSize: 13,
  },
  announcementDate: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 12,
  },
  bottomNavItem: {
    alignItems: 'center',
    gap: 4,
  },
  bottomNavLabel: {
    fontSize: 12,
    color: '#8A8A8F',
  },
  bottomNavLabelActive: {
    color: '#4A90E2',
    fontWeight: '700',
  },
  landlordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    marginBottom: 16,
  },
  landlordHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  landlordAvatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  landlordGreeting: {
    fontSize: 20,
    fontWeight: '700',
    color: '#101c22',
  },
  portfolioLabel: {
    marginTop: 4,
    color: '#8E8E93',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  portfolioBadge: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
  },
  portfolioBadgeText: {
    color: '#101c22',
    fontWeight: '600',
  },
  rentCollectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    marginBottom: 16,
  },
  rentCollectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    color: '#101c22',
  },
  rentCollectionSubtitle: {
    color: '#8E8E93',
  },
  rentSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 16,
  },
  rentSummaryCircle: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 10,
    borderColor: '#93C5FD',
    borderRightColor: '#22C55E',
    borderTopColor: '#22C55E',
    borderLeftColor: '#F59E0B',
    transform: [{ rotate: '-90deg' }],
  },
  rentSummaryTextBlock: {
    flex: 1,
    gap: 4,
  },
  rentCollectionAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#101c22',
  },
  rentCollectionCaption: {
    color: '#8E8E93',
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
  },
  legendLabel: {
    fontSize: 12,
    color: '#111827',
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  quickGridCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  quickGridLabel: {
    fontWeight: '600',
    color: '#101c22',
  },
  recentActivitySection: {
    marginTop: 4,
    gap: 12,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  activityIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityTitle: {
    fontWeight: '700',
    color: '#101c22',
  },
  activitySubtitle: {
    color: '#8E8E93',
    fontSize: 12,
  },
  activityTime: {
    color: '#8E8E93',
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 96,
    height: 56,
    width: 56,
    borderRadius: 28,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
});

export default DashboardScreen;
