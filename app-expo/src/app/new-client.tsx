import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type TabType = 'agregar' | 'seleccion';

const MOCK_CLIENTS = [
  { id: '1', name: 'Juan Pérez', phone: '555-123-4567' },
  { id: '2', name: 'Maria Garcia', phone: '555-987-6543' },
  { id: '3', name: 'Carlos Rodriguez', phone: '555-456-7890' },
  { id: '4', name: 'Ana Martinez', phone: '555-222-3333' },
  { id: '5', name: 'Roberto Sánchez', phone: '555-888-9999' },
  { id: '6', name: 'Elena Gómez', phone: '555-000-1111' },
];

const clientSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  phone: z.string().min(10, 'Debe tener al menos 10 dígitos').regex(/^[0-9]+$/, 'Solo se permiten números'),
  email: z.string().email('Formato de correo inválido').or(z.literal('')).optional(),
});

type ClientForm = z.infer<typeof clientSchema>;

export default function NewClientScreen() {
  const router = useRouter();
  
  // Tab State
  const [activeTab, setActiveTab] = useState<TabType>('agregar');

  // "Agregar" State with React Hook Form
  const { control, handleSubmit, formState: { errors, isValid } } = useForm<ClientForm>({
    resolver: zodResolver(clientSchema),
    mode: 'onChange', // Valida en cada cambio para habilitar el botón
    defaultValues: {
      name: '',
      phone: '',
      email: '',
    }
  });

  // "Selección" State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const isFormValid = isValid;
  const isSelectionValid = selectedClientId !== null;

  const onSaveNewClient = (data: ClientForm) => {
    // Aquí enviarías los datos al backend
    console.log('Nuevo cliente:', data);
    router.back();
  };

  const handleSaveSelection = () => {
    if (activeTab === 'seleccion' && isSelectionValid) {
      const selectedClient = MOCK_CLIENTS.find(c => c.id === selectedClientId);
      if (selectedClient) {
        router.push({
          pathname: '/start-service',
          params: {
            clientId: selectedClient.id,
            clientName: selectedClient.name,
            clientPhone: selectedClient.phone
          }
        });
      }
    }
  };

  const filteredClients = MOCK_CLIENTS.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    client.phone.includes(searchQuery)
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        
        {/* Header */}
        <View style={styles.header}>
          {activeTab === 'agregar' ? (
            <>
              <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#00628F" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Nuevo cliente</Text>
              <View style={styles.headerButton} />
            </>
          ) : (
            // Search Bar for Selection Tab
            <View style={styles.searchBarContainer}>
              <Ionicons name="search" size={18} color="#9CA3AF" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar cliente..."
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          )}
        </View>

        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          
          {activeTab === 'agregar' ? (
            // AGREGAR VIEW
            <View style={styles.card}>
              
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>NOMBRE COMPLETO</Text>
                <View style={[styles.inputWrapper, errors.name && styles.inputError]}>
                  <Ionicons name="person-outline" size={18} color="#6B7280" style={styles.inputIcon} />
                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Ingresa el nombre completo"
                        placeholderTextColor="#9CA3AF"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                </View>
                {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.label}>TELÉFONO CELULAR</Text>
                <View style={[styles.inputWrapper, errors.phone && styles.inputError]}>
                  <Ionicons name="call-outline" size={18} color="#6B7280" style={styles.inputIcon} />
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Ingresa el teléfono celular"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="phone-pad"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                </View>
                {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.label}>CORREO ELECTRÓNICO <Text style={styles.labelOptional}>(Opcional)</Text></Text>
                <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                  <Ionicons name="mail-outline" size={18} color="#6B7280" style={styles.inputIcon} />
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Ingresa el correo electrónico"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                </View>
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
              </View>
            </View>
          ) : (
            // SELECCION VIEW
            <View style={styles.listContainer}>
              {filteredClients.map(client => {
                const isSelected = selectedClientId === client.id;
                return (
                  <TouchableOpacity
                    key={client.id}
                    style={[styles.clientCard, isSelected ? styles.clientCardSelected : {}]}
                    activeOpacity={0.7}
                    onPress={() => setSelectedClientId(client.id)}
                  >
                    <View style={styles.clientInfo}>
                      <Text style={styles.clientName}>{client.name}</Text>
                      <Text style={styles.clientPhone}>{client.phone}</Text>
                    </View>
                    {isSelected && (
                      <Ionicons name="checkmark-circle" size={24} color="#00628F" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {/* Action Buttons */}
          {activeTab === 'agregar' ? (
            <TouchableOpacity 
              style={[styles.actionButton, isFormValid ? styles.actionButtonActive : {}]} 
              onPress={handleSubmit(onSaveNewClient)}
              disabled={!isFormValid}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>Guardar y continuar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={[styles.actionButton, isSelectionValid ? styles.actionButtonActive : {}]} 
              onPress={handleSaveSelection}
              disabled={!isSelectionValid}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>Seleccionar y continuar</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

        </ScrollView>
        
        {/* Bottom Tab Bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity 
            style={[styles.tabItem, activeTab === 'agregar' ? styles.tabItemActiveBg : {}]}
            onPress={() => setActiveTab('agregar')}
          >
            <View style={activeTab === 'agregar' ? styles.tabIconActiveContainer : styles.tabIconInactiveContainer}>
              <Ionicons 
                name="document-text" 
                size={20} 
                color={activeTab === 'agregar' ? '#00628F' : '#9CA3AF'} 
              />
            </View>
            <Text style={[styles.tabText, activeTab === 'agregar' ? styles.tabTextActive : {}]}>AGREGAR</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tabItem, activeTab === 'seleccion' ? styles.tabItemActiveBg : {}]}
            onPress={() => setActiveTab('seleccion')}
          >
            <View style={activeTab === 'seleccion' ? styles.tabIconActiveContainer : styles.tabIconInactiveContainer}>
              <Ionicons 
                name="checkmark-circle" 
                size={22} 
                color={activeTab === 'seleccion' ? '#00628F' : '#9CA3AF'} 
              />
            </View>
            <Text style={[styles.tabText, activeTab === 'seleccion' ? styles.tabTextActive : {}]}>SELECCIÓN</Text>
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
    minHeight: 70, // Para mantener la altura consistente entre tabs
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',

  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 15,
    elevation: 3,
    marginBottom: 32,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  labelOptional: {
    textTransform: 'none',
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    height: 48,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    height: '100%',
  },
  listContainer: {
    marginBottom: 32,
    gap: 12,
  },
  clientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  clientCardSelected: {
    borderColor: '#00628F',
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  clientPhone: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00628F',
  },
  actionButton: {
    backgroundColor: '#D1D5DB', // Disabled state
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  actionButtonActive: {
    backgroundColor: '#00628F', // Active state
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 20,
  },
  cancelButtonText: {
    color: '#4B5563',
    fontSize: 15,
    fontWeight: '600',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 16,
  },
  tabItemActiveBg: {
    backgroundColor: '#F0F9FF',
  },
  tabIconActiveContainer: {
    marginBottom: 4,
  },
  tabIconInactiveContainer: {
    marginBottom: 4,
    opacity: 0.7,
  },
  tabText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.5,
  },
  tabTextActive: {
    color: '#00628F',
    fontWeight: '800',
  }
});
