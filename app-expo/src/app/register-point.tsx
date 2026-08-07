import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

type RecordType = 'entrada' | 'salida_comer' | 'regreso_comer' | 'salida_final';

export default function RegisterPointScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<RecordType>('entrada');
  const [description, setDescription] = useState('');

  const handleConfirm = () => {
    // Aquí iría la lógica de guardado en base de datos.
    // Navegamos directamente a la pantalla de éxito.
    router.replace('/register-success');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.logoText}>
              <Text style={styles.logoDash}>- </Text>
              CENTRAL DE LLAVES MÉXICO®
            </Text>
            <Text style={styles.title}>Registrar Punto</Text>
            <Text style={styles.subtitle}>Completa los detalles de tu jornada laboral hoy.</Text>
          </View>

          {/* Tipo de Registro */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>TIPO DE REGISTRO</Text>
            <View style={styles.gridContainer}>
              <TouchableOpacity 
                style={[styles.gridOption, selectedType === 'entrada' ? styles.gridOptionActive : {}]}
                onPress={() => setSelectedType('entrada')}
                activeOpacity={0.7}
              >
                <Text style={[styles.gridOptionText, selectedType === 'entrada' ? styles.gridOptionTextActive : {}]}>Entrada</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.gridOption, selectedType === 'salida_comer' ? styles.gridOptionActive : {}]}
                onPress={() => setSelectedType('salida_comer')}
                activeOpacity={0.7}
              >
                <Text style={[styles.gridOptionText, selectedType === 'salida_comer' ? styles.gridOptionTextActive : {}]}>Salida a comer</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.gridOption, selectedType === 'regreso_comer' ? styles.gridOptionActive : {}]}
                onPress={() => setSelectedType('regreso_comer')}
                activeOpacity={0.7}
              >
                <Text style={[styles.gridOptionText, selectedType === 'regreso_comer' ? styles.gridOptionTextActive : {}]}>Regreso de comer</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.gridOption, selectedType === 'salida_final' ? styles.gridOptionActive : {}]}
                onPress={() => setSelectedType('salida_final')}
                activeOpacity={0.7}
              >
                <Text style={[styles.gridOptionText, selectedType === 'salida_final' ? styles.gridOptionTextActive : {}]}>Salida final</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Evidencia Visual */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>EVIDENCIA VISUAL</Text>
            <TouchableOpacity style={styles.cameraBox} activeOpacity={0.6}>
              <View style={styles.cameraIconCircle}>
                <Ionicons name="camera-outline" size={24} color="#00628F" />
              </View>
              <Text style={styles.cameraText}>Tocar para tomar foto</Text>
            </TouchableOpacity>
          </View>

          {/* Asunto / Descripción */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>ASUNTO / DESCRIPCIÓN</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ejem: Entrada a Sucursal Lpz Mateos"
              placeholderTextColor="#9CA3AF"
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Tarjeta de Ubicación GPS */}
          <View style={styles.locationCard}>
            <View style={styles.locationHeaderRow}>
              <View style={styles.locationIconCircle}>
                <Ionicons name="navigate" size={16} color="#047857" />
              </View>
              <View style={styles.locationInfoText}>
                <Text style={styles.locationTitle}>📍 Ubicación: Obteniendo GPS...</Text>
                <Text style={styles.locationCoords}>Lat: 24.14, Lon: -110.31</Text>
              </View>
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>PRECISO</Text>
              </View>
            </View>
            
            <View style={styles.mapPlaceholder}>
              {/* Aquí iría la imagen estática del mapa o un componente de mapa */}
              <Ionicons name="map-outline" size={40} color="#9CA3AF" />
              <Text style={styles.mapPlaceholderText}>Mapa simulado</Text>
            </View>
          </View>

          {/* Botón de Confirmar */}
          <TouchableOpacity 
            style={[styles.confirmButton, !description ? styles.confirmButtonDisabled : {}]} 
            onPress={handleConfirm}
            disabled={!description}
          >
            <Text style={[styles.confirmButtonText, !description ? styles.confirmButtonTextDisabled : {}]}>Confirmar registro</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingTop: 32,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 24,
  },
  logoText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#00628F',
    textTransform: 'uppercase',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  logoDash: {
    color: '#E02424',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6B7280',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 8,
  },
  gridOption: {
    width: '48.5%',
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridOptionActive: {
    backgroundColor: '#00628F',
  },
  gridOptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  gridOptionTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  cameraBox: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    borderRadius: 16,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  cameraIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cameraText: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 13,
    color: '#111827',
  },
  locationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  locationHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationInfoText: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  locationCoords: {
    fontSize: 10,
    color: '#6B7280',
  },
  badgeContainer: {
    backgroundColor: '#6EE7B7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#064E3B',
  },
  mapPlaceholder: {
    height: 100,
    backgroundColor: '#4B5563',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 4,
  },
  confirmButton: {
    height: 52,
    backgroundColor: '#00628F',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  confirmButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  confirmButtonTextDisabled: {
    color: '#6B7280',
  }
});
