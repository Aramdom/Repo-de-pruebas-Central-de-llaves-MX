import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// Datos de prueba ampliados (simulando una BD)
const MOCK_TICKETS_DB: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Apertura Automotriz',
    vehicle: 'BMW X5 2021',
    address: 'Calle Morelos #452, Col. Centro, La Paz',
    time: '10:30 AM',
    status: 'pending',
    statusLabel: 'PENDIENTE',
    customer: 'Carlos Ruiz',
    phone: '612 123 4567',
    notes: 'Las llaves se quedaron en el asiento del copiloto. El cliente tiene prisa.',
    coords: '24.1422,-110.3128' // Simulando lat/lng
  },
  '2': {
    id: '2',
    title: 'Cambio de Combinación',
    vehicle: 'Residencial Las Palmas',
    address: 'Av. Las Palmas 120, Casa 4',
    time: '12:15 PM',
    status: 'in_progress',
    statusLabel: 'EN CURSO',
    customer: 'María Fernández',
    phone: '612 987 6543',
    notes: 'Cambio de chapas en entrada principal y patio trasero.',
    coords: '24.1500,-110.3200'
  },
  '3': {
    id: '3',
    title: 'Duplicado de Llave Inteligente',
    vehicle: 'Honda Civic 2019',
    address: 'Plaza Galerías, Estacionamiento B',
    time: '03:00 PM',
    status: 'pending',
    statusLabel: 'PENDIENTE',
    customer: 'Juan Pérez',
    phone: '612 555 1234',
    notes: 'Requiere programación de chip (Transponder).',
    coords: '24.1300,-110.3000'
  }
};

export default function TicketDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const ticket = MOCK_TICKETS_DB[id as string];

  if (!ticket) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Ticket no encontrado</Text>
          <TouchableOpacity style={styles.backButtonCenter} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleOpenMap = () => {
    // Intenta abrir la app de mapas (Google Maps en Android / Maps en iOS)
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ticket.address)}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Error", "No se puede abrir el mapa");
      }
    });
  };

  const handleCall = () => {
    Linking.openURL(`tel:${ticket.phone.replace(/\s+/g, '')}`);
  };

  const handleComplete = () => {
    Alert.alert(
      "Completar Servicio", 
      "¿Estás seguro de que deseas marcar este servicio como completado?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Confirmar", 
          style: "default",
          onPress: () => {
            // Aquí iría la lógica de API
            Alert.alert("Éxito", "Servicio completado exitosamente", [
              { text: "OK", onPress: () => router.back() }
            ]);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle del Servicio</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Main Info Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>TICKET #{ticket.id.padStart(4, '0')}</Text>
            </View>
            <Text style={styles.timeText}>{ticket.time}</Text>
          </View>
          
          <Text style={styles.title}>{ticket.title}</Text>
          <Text style={styles.subtitle}>{ticket.vehicle}</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="person-outline" size={18} color="#00628F" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Cliente</Text>
              <Text style={styles.infoValue}>{ticket.customer}</Text>
            </View>
            <TouchableOpacity style={styles.actionIcon} onPress={handleCall}>
              <Ionicons name="call" size={20} color="#10B981" />
            </TouchableOpacity>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="location-outline" size={18} color="#00628F" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Dirección</Text>
              <Text style={styles.infoValue}>{ticket.address}</Text>
            </View>
          </View>

        </View>

        {/* Notes Card */}
        <View style={styles.notesCard}>
          <Text style={styles.sectionTitle}>Notas del operador</Text>
          <Text style={styles.notesText}>{ticket.notes}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.mapButton} onPress={handleOpenMap}>
            <Ionicons name="navigate" size={20} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.mapButtonText}>Cómo llegar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#00628F" style={styles.buttonIcon} />
            <Text style={styles.completeButtonText}>Marcar Completado</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  container: {
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 15,
    elevation: 3,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  badgeContainer: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.5,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#00628F',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#4B5563',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  notesCard: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FEF3C7',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  notesText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  actionsContainer: {
    gap: 12,
  },
  mapButton: {
    backgroundColor: '#00628F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 16,
    shadowColor: '#00628F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  completeButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E0E7FF',
  },
  completeButtonText: {
    color: '#00628F',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonIcon: {
    marginRight: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
    marginBottom: 16,
  },
  backButtonCenter: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#111827',
    fontWeight: '600',
  }
});
