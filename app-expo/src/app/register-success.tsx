import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function RegisterSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.logoText}>
            <Text style={styles.logoDash}>- </Text>
            CENTRAL DE LLAVES MÉXICO®
          </Text>
        </View>

        {/* Success Header */}
        <View style={styles.successHeader}>
          <View style={styles.iconGlow}>
            <View style={styles.iconCircle}>
              <Ionicons name="checkmark" size={40} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.title}>¡Registro Exitoso!</Text>
          <Text style={styles.subtitle}>
            Tu asistencia ha sido confirmada y{'\n'}registrada en el sistema.
          </Text>
        </View>

        {/* Summary Card */}
        <View style={styles.card}>
          
          {/* Row: Nombre */}
          <View style={styles.infoRow}>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>NOMBRE</Text>
              <Text style={styles.infoValue}>Juan Pérez</Text>
            </View>
            <Ionicons name="person-outline" size={20} color="#D1D5DB" />
          </View>

          {/* Row: Hora */}
          <View style={styles.infoRow}>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>HORA</Text>
              <Text style={styles.infoValue}>09:15 AM</Text>
            </View>
            <Ionicons name="time-outline" size={20} color="#D1D5DB" />
          </View>

          {/* Row: Sede */}
          <View style={styles.infoRow}>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>SEDE</Text>
              <Text style={styles.infoValue}>Corporativo Principal</Text>
            </View>
            <Ionicons name="business-outline" size={20} color="#D1D5DB" />
          </View>

          {/* Row: Estatus */}
          <View style={styles.infoRow}>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>ESTATUS</Text>
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>ENTRADA</Text>
              </View>
            </View>
            <Ionicons name="log-in-outline" size={22} color="#10B981" />
          </View>

          {/* Row: Asunto */}
          <View style={styles.infoRow}>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>ASUNTO</Text>
              <Text style={styles.infoValue}>Inicio de jornada</Text>
            </View>
            <Ionicons name="list-outline" size={20} color="#D1D5DB" />
          </View>

          {/* Map Section */}
          <View style={styles.mapSection}>
            <View style={styles.mapLabelRow}>
              <Ionicons name="location-outline" size={12} color="#00628F" />
              <Text style={styles.mapLabelText}>UBICACIÓN GPS: 24.14, -110.31</Text>
            </View>
            <View style={styles.mapPlaceholder}>
              {/* Fake pin */}
              <View style={styles.pinGlow}>
                <Ionicons name="location" size={48} color="#0EA5E9" />
              </View>
            </View>
          </View>

        </View>

        {/* Action Button */}
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => router.replace('/dashboard')}
          activeOpacity={0.8}
        >
          <Text style={styles.actionButtonText}>Ingresar al panel de control</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={styles.actionButtonIcon} />
        </TouchableOpacity>

        {/* Transaction ID */}
        <Text style={styles.transactionId}>ID de transacción: #ATT-94205-X</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#00628F',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  logoDash: {
    color: '#E02424',
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconGlow: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#D1FAE5', // Soft green glow
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#10B981', // Solid emerald green
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 4,
    marginBottom: 32,
    position: 'relative',
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#4B5563',
    letterSpacing: 1,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  badgeContainer: {
    backgroundColor: '#6EE7B7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#064E3B',
    letterSpacing: 0.5,
  },
  mapSection: {
    marginTop: 8,
  },
  mapLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  mapLabelText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#4B5563',
    letterSpacing: 1,
    marginLeft: 4,
  },
  mapPlaceholder: {
    height: 120,
    backgroundColor: '#374151', // Dark gray simulating map
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  pinGlow: {
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  actionButton: {
    backgroundColor: '#00628F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#00628F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  actionButtonIcon: {
    marginLeft: 12,
  },
  transactionId: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
    fontWeight: '500',
  }
});
