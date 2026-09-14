import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function SurveyScreen() {
  const router = useRouter();
  
  // States for survey answers
  const [rating, setRating] = useState<number>(0);
  const [priceOpinion, setPriceOpinion] = useState<string | null>(null);
  const [wouldReturn, setWouldReturn] = useState<boolean | null>(null);

  const handleFinish = () => {
    router.replace({
      pathname: '/service-summary',
      params: { status: 'completed' }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      {/* Header (No back button) */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Encuesta de satisfacción</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Intro */}
        <Text style={styles.introTitle}>Ayúdanos a mejorar.</Text>
        <Text style={styles.introSubtitle}>Por favor, responde 3 preguntas rápidas.</Text>

        {/* Q1: Quality Rating */}
        <View style={styles.card}>
          <View style={styles.pillBadge}>
            <Text style={styles.pillBadgeText}>PREGUNTA 1</Text>
          </View>
          <Text style={styles.questionText}>
            ¿Cómo calificarías la calidad del servicio realizado?
          </Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity 
                key={star} 
                onPress={() => setRating(star)}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={star <= rating ? "star" : "star-outline"} 
                  size={32} 
                  color={star <= rating ? "#00628F" : "#9CA3AF"} 
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Q2: Price Opinion */}
        <View style={styles.card}>
          <View style={styles.pillBadge}>
            <Text style={styles.pillBadgeText}>PREGUNTA 2</Text>
          </View>
          <Text style={styles.questionText}>
            ¿Considera que el precio del servicio fue adecuado?
          </Text>
          <View style={styles.optionsRow}>
            {['Alto', 'Justo', 'Bajo'].map((option) => {
              const isActive = priceOpinion === option;
              return (
                <TouchableOpacity 
                  key={option}
                  style={[styles.optionPill, isActive && styles.optionPillActive]}
                  onPress={() => setPriceOpinion(option)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.optionPillText, isActive && styles.optionPillTextActive]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        {/* Q3: Would return */}
        <View style={styles.card}>
          <View style={styles.pillBadge}>
            <Text style={styles.pillBadgeText}>PREGUNTA 3</Text>
          </View>
          <Text style={styles.questionText}>
            ¿Volvería a solicitar nuestros servicios en el futuro?
          </Text>
          <View style={styles.optionsRow}>
            {/* Si option */}
            <TouchableOpacity 
              style={[styles.optionPill, {flex: 1}, wouldReturn === true && styles.optionPillActive]}
              onPress={() => setWouldReturn(true)}
              activeOpacity={0.8}
            >
              {wouldReturn === true && (
                <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
              )}
              <Text style={[styles.optionPillText, wouldReturn === true && styles.optionPillTextActive]}>
                Sí
              </Text>
            </TouchableOpacity>

            {/* No option */}
            <TouchableOpacity 
              style={[styles.optionPill, {flex: 1}, wouldReturn === false && styles.optionPillActive]}
              onPress={() => setWouldReturn(false)}
              activeOpacity={0.8}
            >
              <Text style={[styles.optionPillText, wouldReturn === false && styles.optionPillTextActive]}>
                No
              </Text>
            </TouchableOpacity>
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
          <Text style={styles.actionButtonText}>Guardar y finalizar servicio</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  introTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 6,
  },
  introSubtitle: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  pillBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E7FF', // Light blue background
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  pillBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0055D4', // Blue text
    letterSpacing: 0.5,
  },
  questionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 20,
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // Requires React Native 0.71+ (Expo 48+)
  },
  starIcon: {
    marginRight: 6,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  optionPill: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionPillActive: {
    backgroundColor: '#00628F',
  },
  optionPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  optionPillTextActive: {
    color: '#FFFFFF',
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
    fontSize: 14,
    fontWeight: '700',
  }
});
