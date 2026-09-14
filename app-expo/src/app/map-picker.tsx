import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function MapPickerScreen() {
  const router = useRouter();
  
  const handleConfirm = () => {
    // Navigate back to start-service with location data
    router.replace({
      pathname: '/start-service',
      params: { 
        locationCaptured: 'true',
        address: 'Calle Abasolo 123, Centro, 23000 La Paz, B.C.S.'
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Fake Map Background */}
      <View style={styles.mapBackground}>
        {/* We use a simple grid or dark color to simulate the map */}
        <View style={styles.gridOverlay} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        
        {/* Top Floating Controls */}
        <View style={styles.topControls}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.circleButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} color="#00628F" />
            </TouchableOpacity>
            
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Fijar destino</Text>
            </View>

            <TouchableOpacity style={styles.circleButton}>
              <Ionicons name="search" size={20} color="#00628F" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color="#00628F" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Calle Revolución 123, Centro"
              placeholderTextColor="#111827"
              editable={false}
            />
          </View>
        </View>

        {/* Center Pin */}
        <View style={styles.centerPinContainer} pointerEvents="none">
          <View style={styles.pinCircle}>
            <Ionicons name="location" size={24} color="#FFFFFF" />
          </View>
        </View>

        {/* Right Floating Buttons */}
        <View style={styles.rightControls}>
          <TouchableOpacity style={styles.layersButton}>
            <Ionicons name="layers" size={20} color="#4B5563" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.gpsButton}>
            <Ionicons name="locate" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Bottom Sheet */}
        <View style={styles.bottomSheet}>
          <View style={styles.locationInfoRow}>
            <View style={styles.locationIconWrapper}>
              <Ionicons name="locate" size={22} color="#00628F" />
            </View>
            <View style={styles.locationTextWrapper}>
              <Text style={styles.locationLabel}>PUNTO DE ENTREGA CONFIRMADO</Text>
              <Text style={styles.locationAddress}>
                Calle Abasolo 123, Centro,{'\n'}23000 La Paz, B.C.S.
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm} activeOpacity={0.8}>
            <Text style={styles.confirmButtonText}>Confirmar ubicación</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#374151', // Dark map background
  },
  mapBackground: {
    ...StyleSheet.absoluteFill as any,
    backgroundColor: '#6B7280', 
  },
  gridOverlay: {
    flex: 1,
    opacity: 0.2,
    // A simple trick to simulate streets could be added here if needed, 
    // but a solid color is fine for a placeholder.
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topControls: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  badge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 54,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',

  },
  centerPinContainer: {
    ...StyleSheet.absoluteFill as any,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // above map background
  },
  pinCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0055D4', // Strong blue map pin
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    transform: [{ translateY: -28 }], // offset to point at center
  },
  rightControls: {
    position: 'absolute',
    right: 16,
    bottom: 220, // above bottom sheet
    alignItems: 'center',
    gap: 16,
    zIndex: 20,
  },
  layersButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  gpsButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#0055D4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
    zIndex: 30,
  },
  locationInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  locationIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E0E7FF', // Light blue background
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  locationTextWrapper: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#6B7280',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 22,
  },
  confirmButton: {
    backgroundColor: '#00628F',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
