import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function ServiceClosureScreen() {
  const router = useRouter();
  const { desc } = useLocalSearchParams<any>();
  
  const jobType = desc || 'Apertura de Jetta 2018';
  
  const [amount, setAmount] = useState('');
  const [isWhatsappSelected, setIsWhatsappSelected] = useState(false);

  const numericAmount = parseFloat(amount || '0');
  const isFormValid = numericAmount > 0 && isWhatsappSelected;

  const handleSend = () => {
    if (isFormValid) {
      router.replace('/survey');
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
          <Text style={styles.headerTitle}>Cierre de servicio</Text>
          <View style={styles.headerButton} />
        </View>

        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          
          {/* Card 1: Cantidad a cobrar */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>CANTIDAD A COBRAR</Text>
            
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor="#D1D5DB"
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            <View style={styles.badgeContainer}>
              <View style={styles.currencyBadge}>
                <Text style={styles.currencyBadgeText}>Divisa: MXN</Text>
              </View>
            </View>
          </View>

          {/* Card 2: Notificaciones */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>NOTIFICAR AL CLIENTE</Text>
            
            <View style={styles.methodsRow}>
              
              {/* WhatsApp Button */}
              <TouchableOpacity 
                style={[
                  styles.methodBox, 
                  isWhatsappSelected ? styles.methodBoxActive : styles.methodBoxInactive
                ]}
                activeOpacity={0.7}
                onPress={() => setIsWhatsappSelected(!isWhatsappSelected)}
              >
                <View style={[styles.iconCircle, isWhatsappSelected ? styles.iconCircleActive : styles.iconCircleInactive]}>
                  <Ionicons 
                    name="chatbubble-ellipses" 
                    size={22} 
                    color={isWhatsappSelected ? "#FFFFFF" : "#047857"} 
                  />
                </View>
                <Text style={[styles.methodText, isWhatsappSelected ? styles.methodTextActive : styles.methodTextInactive]}>
                  WhatsApp
                </Text>
              </TouchableOpacity>

              {/* Email Button (Disabled) */}
              <View style={[styles.methodBox, styles.methodBoxDisabled]}>
                <View style={styles.iconCircleDisabled}>
                  <Ionicons name="mail-outline" size={22} color="#9CA3AF" />
                </View>
                <Text style={styles.methodTextDisabled}>
                  Correo{'\n'}(No registrado)
                </Text>
              </View>

            </View>
          </View>

          {/* Summary Details */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>ID de servicio</Text>
              <Text style={styles.summaryValue}>#LCK-2941-23</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tipo de trabajo</Text>
              <Text style={styles.summaryValue}>{jobType}</Text>
            </View>
          </View>

        </ScrollView>
        
        {/* Bottom Actions */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, isFormValid ? styles.actionButtonActive : {}]} 
            onPress={handleSend}
            disabled={!isFormValid}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>Enviar confirmación</Text>
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
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: '700',
    color: '#9CA3AF',
    marginRight: 8,
    marginTop: -8, // visually align with huge text
  },
  amountInput: {
    fontSize: 64,
    fontWeight: '700',
    color: '#111827',
    minWidth: 140,

  },
  badgeContainer: {
    alignItems: 'center',
  },
  currencyBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  currencyBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  methodsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  methodBox: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodBoxInactive: {
    backgroundColor: '#F3F4F6', // Light gray 
  },
  methodBoxActive: {
    backgroundColor: '#ECFDF5', // Light green
  },
  methodBoxDisabled: {
    backgroundColor: '#F3F4F6',
    marginLeft: 16,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircleInactive: {
    backgroundColor: '#FFFFFF',
  },
  iconCircleActive: {
    backgroundColor: '#047857', // Dark green
  },
  iconCircleDisabled: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  methodText: {
    fontSize: 13,
    fontWeight: '700',
  },
  methodTextInactive: {
    color: '#4B5563',
  },
  methodTextActive: {
    color: '#047857',
  },
  methodTextDisabled: {
    fontSize: 11,
    fontWeight: '500',
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 14,
  },
  summaryContainer: {
    paddingHorizontal: 8,
    marginTop: 8,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '700',
  },
  bottomContainer: {
    backgroundColor: '#F5F6F8', // The image shows bottom container is same color as bg, just a button floating
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  actionButton: {
    backgroundColor: '#D1D5DB', // Disabled state (gray)
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonActive: {
    backgroundColor: '#00628F', // Active state (blue)
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  }
});
