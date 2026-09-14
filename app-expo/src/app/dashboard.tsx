import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Panel de Control</Text>
          <Text style={styles.subtitle}>
            Bienvenido a tu centro de operaciones.{'\n'}Gestiona tus servicios y reportes del{'\n'}día.
          </Text>
          <View style={styles.locationPill}>
            <Ionicons name="location-outline" size={16} color="#00628F" />
            <Text style={styles.locationText}>La Paz, B.C.S.</Text>
          </View>
        </View>

        {/* Action Cards */}
        <TouchableOpacity style={styles.actionCard} activeOpacity={0.7} onPress={() => router.push('/tickets')}>
          <View style={[styles.iconContainer, { backgroundColor: '#E0E7FF' }]}>
            <Ionicons name="car-outline" size={24} color="#00628F" />
          </View>
          <View style={styles.actionTextContainer}>
            <Text style={styles.actionTitle}>Servicio en campo</Text>
            <Text style={styles.actionDesc}>Inicia una nueva ruta hacia el{'\n'}cliente asignado y consulta{'\n'}mapas.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} activeOpacity={0.7} onPress={() => router.push('/location')}>
          <View style={[styles.iconContainer, { backgroundColor: '#D1FAE5' }]}>
            <Ionicons name="time-outline" size={24} color="#047857" />
          </View>
          <View style={styles.actionTextContainer}>
            <Text style={styles.actionTitle}>Registro de asistencia</Text>
            <Text style={styles.actionDesc}>Marca un estatus de tu jornada{'\n'}laboral: entrada y salida.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} activeOpacity={0.7} onPress={() => router.push('/new-client')}>
          <View style={[styles.iconContainer, { backgroundColor: '#FEF3C7' }]}>
            <Ionicons name="person-add-outline" size={24} color="#D97706" />
          </View>
          <View style={styles.actionTextContainer}>
            <Text style={styles.actionTitle}>Registrar Cliente</Text>
            <Text style={styles.actionDesc}>Agrega un nuevo cliente a la{'\n'}base de datos del sistema.</Text>
          </View>
        </TouchableOpacity>

        {/* Recent Activity Section */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Actividad reciente</Text>
          
          <View style={styles.recentListContainer}>
            
            {/* Activity Item 1 */}
            <View style={styles.activityCard}>
              <View style={[styles.activityIconContainer, { backgroundColor: '#EFF6FF' }]}>
                <Ionicons name="key-outline" size={18} color="#2563EB" />
              </View>
              <View style={styles.activityTextContainer}>
                <Text style={styles.activityTitle}>Apertura{'\n'}Automotriz -{'\n'}BMW X5</Text>
                <Text style={styles.activitySubtitle}>Calle Morelos #452 •{'\n'}10:30 AM</Text>
              </View>
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>COMPLETADO</Text>
              </View>
            </View>

            {/* Activity Item 2 */}
            <View style={styles.activityCard}>
              <View style={[styles.activityIconContainer, { backgroundColor: '#EFF6FF' }]}>
                <Ionicons name="briefcase-outline" size={18} color="#2563EB" />
              </View>
              <View style={styles.activityTextContainer}>
                <Text style={styles.activityTitle}>Cambio de{'\n'}Combinación</Text>
                <Text style={styles.activitySubtitle}>Residencial Las{'\n'}Palmas • 08:15 AM</Text>
              </View>
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>COMPLETADO</Text>
              </View>
            </View>

          </View>
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
  container: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 16,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  locationText: {
    marginLeft: 6,
    color: '#00628F',
    fontWeight: '700',
    fontSize: 13,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 15,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#00628F',
    marginBottom: 6,
  },
  actionDesc: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
  },
  recentSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  recentListContainer: {
    backgroundColor: '#F1F5F9', // slightly darker wrapper bg
    borderRadius: 20,
    padding: 16,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityTextContainer: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
    lineHeight: 16,
  },
  activitySubtitle: {
    fontSize: 10,
    color: '#6B7280',
    lineHeight: 14,
  },
  badgeContainer: {
    backgroundColor: '#6EE7B7', // bright mint green
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#064E3B', // dark green text for contrast
    letterSpacing: 0.5,
  }
});
