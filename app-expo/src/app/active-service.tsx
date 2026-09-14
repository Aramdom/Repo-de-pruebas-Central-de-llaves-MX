import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function ActiveServiceScreen() {
  const router = useRouter();
  const { clientName, description, address } = useLocalSearchParams<any>();
  
  // Fallbacks for testing
  const name = clientName || 'Juan Pérez';
  const desc = description || 'Apertura de Jetta 2018';
  const addr = address || 'Calle Abasolo 123, Centro';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#00628F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Servicio Activo</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Main Card */}
        <View style={styles.card}>
          
          {/* Status Header */}
          <View style={styles.statusHeader}>
            <View style={styles.statusIconContainer}>
              <View style={styles.statusDot} />
            </View>
            <View style={styles.statusTextWrapper}>
              <Text style={styles.statusLabel}>ESTADO ACTUAL</Text>
              <Text style={styles.statusValue}>EN RUTA</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.detailsTitle}>Detalles del Servicio:</Text>
          
          {/* Detail Items */}
          <View style={styles.detailItem}>
            <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.detailIcon} />
            <View>
              <Text style={styles.detailLabel}>Cliente</Text>
              <Text style={styles.detailValue}>{name}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="key-outline" size={20} color="#9CA3AF" style={styles.detailIcon} />
            <View>
              <Text style={styles.detailLabel}>Asunto</Text>
              <Text style={styles.detailValue}>{desc}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={20} color="#9CA3AF" style={styles.detailIcon} />
            <View>
              <Text style={styles.detailLabel}>Ubicación Destino</Text>
              <Text style={styles.detailValue}>{addr}</Text>
            </View>
          </View>

        </View>

        {/* GPS Banner */}
        <View style={styles.gpsBanner}>
          <Ionicons name="radio-outline" size={20} color="#6B7280" style={styles.gpsIcon} />
          <Text style={styles.gpsText}>
            Transmisión GPS Activa. Rastreando ubicación en segundo plano...
          </Text>
        </View>

      </ScrollView>
      
      {/* Bottom Actions */}
      <View style={styles.bottomContainer}>
        
        <TouchableOpacity style={styles.dashboardButton} onPress={() => router.replace('/dashboard')} activeOpacity={0.8}>
          <Ionicons name="grid-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.dashboardButtonText}>Volver al panel de control</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.finishButton} 
          onPress={() => router.push({
            pathname: '/service-closure',
            params: { desc: desc }
          })} 
          activeOpacity={0.8}
        >
          <Text style={styles.finishButtonText}>Terminar servicio</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => router.replace({
            pathname: '/service-summary',
            params: { status: 'canceled', clientName: name, description: desc, address: addr }
          })}
        >
          <Text style={styles.cancelButtonText}>CANCELAR / INTERRUMPIR SERVICIO</Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 16,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D1FAE5', // Light green
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statusDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#047857', // Dark green
    borderWidth: 2,
    borderColor: '#FFFFFF', // White border to make it look like a target
  },
  statusTextWrapper: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#00628F',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  detailIcon: {
    marginTop: 2,
    marginRight: 12,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  gpsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
  },
  gpsIcon: {
    marginRight: 12,
  },
  gpsText: {
    flex: 1,
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 18,
  },
  bottomContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 30,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  dashboardButton: {
    flexDirection: 'row',
    backgroundColor: '#00628F', // Dark blue
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  dashboardButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  finishButton: {
    backgroundColor: '#6EE7B7', // Neon green
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  finishButtonText: {
    color: '#047857', // Dark green text for contrast on neon green
    fontSize: 15,
    fontWeight: '700',
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  cancelButtonText: {
    color: '#DC2626', // Red
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  }
});
