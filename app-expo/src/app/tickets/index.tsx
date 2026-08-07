import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// Datos de prueba para los tickets
const MOCK_TICKETS = [
  {
    id: '1',
    title: 'Apertura Automotriz',
    vehicle: 'BMW X5 2021',
    address: 'Calle Morelos #452, Col. Centro',
    time: '10:30 AM',
    status: 'pending',
    statusLabel: 'PENDIENTE',
    icon: 'car-sport-outline',
    color: '#F59E0B', // Ambar para pendiente
    bg: '#FEF3C7'
  },
  {
    id: '2',
    title: 'Cambio de Combinación',
    vehicle: 'Residencial Las Palmas',
    address: 'Av. Las Palmas 120, Casa 4',
    time: '12:15 PM',
    status: 'in_progress',
    statusLabel: 'EN CURSO',
    icon: 'home-outline',
    color: '#3B82F6', // Azul para en curso
    bg: '#DBEAFE'
  },
  {
    id: '3',
    title: 'Duplicado de Llave Inteligente',
    vehicle: 'Honda Civic 2019',
    address: 'Plaza Galerías, Estacionamiento B',
    time: '03:00 PM',
    status: 'pending',
    statusLabel: 'PENDIENTE',
    icon: 'key-outline',
    color: '#F59E0B', 
    bg: '#FEF3C7'
  }
];

export default function TicketsListScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Servicios de Hoy</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.dateText}>Jueves, 24 de Octubre</Text>
        <Text style={styles.summaryText}>Tienes {MOCK_TICKETS.length} servicios programados para hoy.</Text>

        <View style={styles.listContainer}>
          {MOCK_TICKETS.map((ticket) => (
            <TouchableOpacity 
              key={ticket.id} 
              style={styles.ticketCard}
              activeOpacity={0.7}
              onPress={() => router.push(`/tickets/${ticket.id}`)}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.statusBadge, { backgroundColor: ticket.bg }]}>
                  <Text style={[styles.statusText, { color: ticket.color }]}>{ticket.statusLabel}</Text>
                </View>
                <Text style={styles.timeText}>{ticket.time}</Text>
              </View>

              <View style={styles.cardBody}>
                <View style={[styles.iconContainer, { backgroundColor: '#F1F5F9' }]}>
                  <Ionicons name={ticket.icon as any} size={22} color="#475569" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{ticket.title}</Text>
                  <Text style={styles.subtitle}>{ticket.vehicle}</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <Ionicons name="location-outline" size={14} color="#6B7280" />
                <Text style={styles.addressText} numberOfLines={1}>{ticket.address}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  dateText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  summaryText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  listContainer: {
    gap: 16,
  },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#4B5563',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
  },
  addressText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
    flex: 1,
  }
});
