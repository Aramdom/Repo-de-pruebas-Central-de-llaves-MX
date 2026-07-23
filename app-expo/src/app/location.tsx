import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function LocationScreen() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedLocation) {
      router.replace('/dashboard');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.logoText}>
            <Text style={styles.logoDash}>- </Text>
            CENTRAL DE LLAVES MÉXICO®
          </Text>
          <Text style={styles.title}>¿Dónde te{'\n'}encuentras hoy?</Text>
          <Text style={styles.subtitle}>Selecciona tu ubicación actual para{'\n'}registrar tu jornada laboral con{'\n'}precisión.</Text>
        </View>

        {/* Locations Card */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>UBICACIONES DISPONIBLES</Text>
          
          {/* Option 1 */}
          <TouchableOpacity 
            style={styles.locationItem}
            activeOpacity={0.7}
            onPress={() => setSelectedLocation('corporativo')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#E0E7FF' }]}>
              <Ionicons name="business" size={20} color="#00628F" />
            </View>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationTitle}>Corporativo{'\n'}Principal</Text>
              <Text style={styles.locationAddress}>Av. Reforma 450, Ciudad{'\n'}de México</Text>
            </View>
            <View style={styles.radioContainer}>
              <Ionicons 
                name={selectedLocation === 'corporativo' ? "radio-button-on" : "radio-button-off"} 
                size={22} 
                color={selectedLocation === 'corporativo' ? "#00628F" : "#D1D5DB"} 
              />
            </View>
          </TouchableOpacity>

          {/* Option 2 */}
          <TouchableOpacity 
            style={styles.locationItem}
            activeOpacity={0.7}
            onPress={() => setSelectedLocation('sucursal_norte')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#F3F4F6' }]}>
              <Ionicons name="storefront" size={20} color="#6B7280" />
            </View>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationTitle}>Sucursal Norte</Text>
              <Text style={styles.locationAddress}>Parque Industrial Vallejo,{'\n'}Sector 4</Text>
            </View>
            <View style={styles.radioContainer}>
              <Ionicons 
                name={selectedLocation === 'sucursal_norte' ? "radio-button-on" : "radio-button-off"} 
                size={22} 
                color={selectedLocation === 'sucursal_norte' ? "#00628F" : "#D1D5DB"} 
              />
            </View>
          </TouchableOpacity>

          {/* Continue Button */}
          <TouchableOpacity 
            style={[
              styles.continueButton, 
              selectedLocation ? styles.continueButtonActive : {}
            ]} 
            onPress={handleContinue}
            disabled={!selectedLocation}
          >
            <Text style={[
              styles.continueButtonText,
              selectedLocation ? styles.continueButtonTextActive : {}
            ]}>Continuar</Text>
          </TouchableOpacity>
          
          <Text style={styles.gpsHint}>
            Debes habilitar los permisos de GPS para{'\n'}continuar
          </Text>
        </View>

        {/* Auto Detection Card */}
        <View style={styles.autoDetectCard}>
          <View style={styles.autoDetectIcon}>
            <Ionicons name="location-outline" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.autoDetectTextContainer}>
            <Text style={styles.autoDetectLabel}>DETECCIÓN AUTOMÁTICA</Text>
            <Text style={styles.autoDetectText}>
              Te encuentras cerca de:{'\n'}
              <Text style={styles.autoDetectHighlight}>Corporativo Principal</Text>
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F6F8', // Light gray background matching login
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 32,
  },
  logoText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#00628F',
    textTransform: 'uppercase',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  logoDash: {
    color: '#E02424', // Red dash
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 15,
    elevation: 3,
    marginBottom: 20,
  },
  cardLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 1,
    marginBottom: 16,
    marginLeft: 4,
  },
  locationItem: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
    lineHeight: 18,
  },
  locationAddress: {
    fontSize: 11,
    color: '#6B7280',
    lineHeight: 16,
  },
  radioContainer: {
    marginLeft: 12,
  },
  continueButton: {
    backgroundColor: '#E5E7EB',
    borderRadius: 14,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  continueButtonActive: {
    backgroundColor: '#00628F',
  },
  continueButtonText: {
    color: '#9CA3AF',
    fontSize: 15,
    fontWeight: '700',
  },
  continueButtonTextActive: {
    color: '#FFFFFF',
  },
  gpsHint: {
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 14,
  },
  autoDetectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 15,
    elevation: 3,
  },
  autoDetectIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#34D399', // Emerald green
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  autoDetectTextContainer: {
    flex: 1,
  },
  autoDetectLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#00628F',
    letterSpacing: 1,
    marginBottom: 4,
  },
  autoDetectText: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '500',
    lineHeight: 18,
  },
  autoDetectHighlight: {
    color: '#00628F',
    fontWeight: '700',
  },
});
