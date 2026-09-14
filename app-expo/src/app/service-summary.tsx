import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function ServiceSummaryScreen() {
  const router = useRouter();
  const { status, clientName, description, address } = useLocalSearchParams<any>();
  
  const isCanceled = status === 'canceled';
  
  // Fake data if not provided
  const name = clientName || 'Juan Pérez';
  const desc = description || 'Apertura de Jetta 2018';
  const addr = address || 'Calle Abasolo 123, Centro';

  // Get current time formatted like "04:28 PM"
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleFinish = () => {
    router.dismissAll();
    router.replace('/dashboard');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          
          {/* Main Icon */}
          <View style={[
            styles.heroIconContainer, 
            isCanceled ? styles.heroIconCanceled : styles.heroIconCompleted
          ]}>
            <Ionicons 
              name={isCanceled ? "close" : "checkmark"} 
              size={48} 
              color="#FFFFFF" 
            />
          </View>
          
          <Text style={styles.heroTitle}>
            {isCanceled ? 'Servicio cancelado' : '¡Servicio finalizado!'}
          </Text>
          <Text style={styles.heroSubtitle}>
            La ruta y los datos del trabajo se han registrado correctamente en el sistema.
          </Text>
        </View>

        {/* Summary Card */}
        <View style={styles.card}>
          
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>RESUMEN DE LA ORDEN</Text>
            <View style={[
              styles.statusBadge, 
              isCanceled ? styles.statusBadgeCanceled : styles.statusBadgeCompleted
            ]}>
              <Text style={[
                styles.statusBadgeText,
                isCanceled ? styles.statusBadgeTextCanceled : styles.statusBadgeTextCompleted
              ]}>
                {isCanceled ? 'CANCELADO' : 'COMPLETADO'}
              </Text>
            </View>
          </View>

          {/* Details */}
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Cliente</Text>
            <Text style={styles.detailValue}>{name}</Text>
          </View>

          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Asunto</Text>
            <Text style={styles.detailValue}>{desc}</Text>
          </View>

          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Destino</Text>
            <View style={styles.iconRow}>
              <Ionicons name="location-outline" size={16} color="#0055D4" style={styles.rowIcon} />
              <Text style={styles.detailValue}>{addr}</Text>
            </View>
          </View>

          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Hora de término</Text>
            <View style={styles.iconRow}>
              <Ionicons name="time-outline" size={16} color="#D97706" style={styles.rowIcon} />
              <Text style={styles.detailValue}>{timeString}</Text>
            </View>
          </View>

          {/* Fake Map History */}
          <View style={styles.fakeMapContainer}>
            <View style={styles.fakeMapPill}>
              <Text style={styles.fakeMapPillText}>Ruta guardada en historial</Text>
            </View>
          </View>

        </View>

      </ScrollView>
      
      {/* Bottom Actions */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={handleFinish}
          activeOpacity={0.8}
        >
          <Ionicons name="grid-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.actionButtonText}>Volver al panel de control</Text>
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
  container: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heroIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  heroIconCompleted: {
    backgroundColor: '#10B981', // Green
  },
  heroIconCanceled: {
    backgroundColor: '#EF4444', // Red
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
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
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeCompleted: {
    backgroundColor: '#D1FAE5',
  },
  statusBadgeCanceled: {
    backgroundColor: '#FEE2E2',
  },
  statusBadgeText: {
    fontSize: 9,
    fontWeight: '800',
  },
  statusBadgeTextCompleted: {
    color: '#047857',
  },
  statusBadgeTextCanceled: {
    color: '#B91C1C',
  },
  detailBlock: {
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 6,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowIcon: {
    marginRight: 6,
  },
  fakeMapContainer: {
    height: 120,
    backgroundColor: '#D1D5DB', // Gray placeholder
    borderRadius: 16,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fakeMapPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    opacity: 0.9,
  },
  fakeMapPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#374151',
  },
  bottomContainer: {
    backgroundColor: '#F5F6F8',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#00628F', // Solid blue
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  }
});
