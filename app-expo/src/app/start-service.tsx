import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function StartServiceScreen() {
  const router = useRouter();
  
  // Extraemos también los parámetros que nos puede regresar el mapa
  const { 
    clientId, 
    clientName, 
    clientPhone, 
    locationCaptured: paramLocationCaptured,
    address: paramAddress
  } = useLocalSearchParams<any>();
  
  // Use fallbacks if no params provided for direct testing
  const name = clientName || 'Juan Pérez';
  const phone = clientPhone || '555-123-4567';

  // State
  const [description, setDescription] = useState('');
  
  // Check if location was captured (from url params)
  const locationCaptured = paramLocationCaptured === 'true';
  const address = paramAddress || '';

  const isFormValid = description.trim().length > 0 && locationCaptured;

  const handleStartService = () => {
    if (isFormValid) {
      router.replace({
        pathname: '/active-service',
        params: {
          clientName: name,
          description: description,
          address: address
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#00628F" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Servicio de campo</Text>
          <View style={styles.headerButton} />
        </View>

        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          
          {/* Card 1: Cliente seleccionado */}
          <View style={styles.card}>
            <View style={styles.stepHeader}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepTitle}>Cliente seleccionado</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.clientName}>{name}</Text>
              <Text style={styles.clientPhone}>{phone}</Text>
            </View>
          </View>

          {/* Card 2: Asunto del servicio */}
          <View style={styles.card}>
            <View style={styles.stepHeader}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepTitle}>Asunto del servicio</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.label}>DESCRIPCIÓN DE LA LABOR</Text>
              <View style={styles.textAreaContainer}>
                <TextInput
                  style={styles.textArea}
                  placeholder="Ej. Apertura de Jetta 2018, Cambio de chapa residencial..."
                  placeholderTextColor="#9CA3AF"
                  multiline={true}
                  numberOfLines={4}
                  value={description}
                  onChangeText={setDescription}
                  textAlignVertical="top"
                />
              </View>
            </View>
          </View>

          {/* Card 3: Ubicación del destino */}
          <View style={styles.card}>
            <View style={styles.stepHeader}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepTitle}>Ubicación del destino</Text>
            </View>
            <View style={styles.cardContent}>
              
              {!locationCaptured ? (
                // Initial State: Single Button
                <TouchableOpacity 
                  style={styles.locationButton}
                  activeOpacity={0.7}
                  onPress={() => router.push('/map-picker')}
                >
                  <Ionicons name="map-outline" size={20} color="#0055D4" style={styles.locationIcon} />
                  <Text style={styles.locationButtonText}>
                    Seleccionar ubicación en el mapa
                  </Text>
                </TouchableOpacity>
              ) : (
                // Captured State: Split View
                <View>
                  <View style={styles.selectedLocationContainer}>
                    <Ionicons name="location" size={20} color="#0055D4" style={styles.locationIconTop} />
                    <View style={styles.selectedLocationTextWrapper}>
                      <Text style={styles.selectedLocationLabel}>UBICACIÓN SELECCIONADA</Text>
                      <Text style={styles.selectedLocationAddress}>{address}</Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.editLocationButton}
                    activeOpacity={0.7}
                    onPress={() => router.push('/map-picker')}
                  >
                    <Ionicons name="map-outline" size={18} color="#0055D4" style={styles.locationIcon} />
                    <Text style={styles.editLocationButtonText}>
                      Editar ubicación en el mapa
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

            </View>
          </View>

          <View style={styles.footerNoteContainer}>
            <Ionicons name="information-circle-outline" size={14} color="#6B7280" style={{ marginTop: 2, marginRight: 6 }} />
            <Text style={styles.footerNoteText}>
              Asegúrese de que el cliente esté presente al momento de iniciar la labor para validar la propiedad.
            </Text>
          </View>

        </ScrollView>
        
        {/* Bottom Actions */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, isFormValid ? styles.actionButtonActive : {}]} 
            onPress={handleStartService}
            disabled={!isFormValid}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>Iniciar servicio</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
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
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 16,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumberText: {
    color: '#0055D4',
    fontSize: 12,
    fontWeight: '800',
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  cardContent: {
    paddingLeft: 4,
  },
  clientName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  clientPhone: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00628F',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  textAreaContainer: {
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    minHeight: 90,
  },
  textArea: {
    flex: 1,
    fontSize: 14,
    color: '#111827',

  },
  // Button Initial State
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    paddingVertical: 14,
  },
  locationIcon: {
    marginRight: 8,
  },
  locationButtonText: {
    color: '#0055D4', // Blue text
    fontSize: 14,
    fontWeight: '600',
  },
  // Split View Captured State
  selectedLocationContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  locationIconTop: {
    marginRight: 12,
    marginTop: 2,
  },
  selectedLocationTextWrapper: {
    flex: 1,
  },
  selectedLocationLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#4B5563',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  selectedLocationAddress: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  editLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 14,
  },
  editLocationButtonText: {
    color: '#0055D4',
    fontSize: 14,
    fontWeight: '600',
  },
  // ---
  footerNoteContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginTop: 8,
    marginBottom: 20,
  },
  footerNoteText: {
    flex: 1,
    fontSize: 11,
    color: '#6B7280',
    lineHeight: 16,
  },
  bottomContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  actionButton: {
    backgroundColor: '#D1D5DB', // Disabled state
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionButtonActive: {
    backgroundColor: '#00628F', // Active state solid blue
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  cancelButtonText: {
    color: '#4B5563',
    fontSize: 15,
    fontWeight: '600',
  }
});
