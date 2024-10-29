import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Text } from 'react-native';
import { TextInput, Button, Chip, Menu, Divider } from 'react-native-paper';
import CalendarComponent from './calendars'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width } = Dimensions.get('window');

export default function DreamForm() {
  const [dreamText, setDreamText] = useState('');
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [keywords, setKeywords] = useState([]); // Mots-clés
  const [keywordInput, setKeywordInput] = useState(''); // Champ pour saisir les mots-clés
  const [typeOfDream, setTypeOfDream] = useState(''); // Type de rêve sélectionné
  const [menuVisible, setMenuVisible] = useState(false); // État pour afficher ou masquer le menu
  const [moonPhase, setMoonPhase] = useState(''); // État pour stocker la phase lunaire

  const fetchMoonPhase = async (date) => {
    try {
      const response = await axios.get(`https://api.moon-api.com/v1/moonphase?date=${date}`, {
        headers: { 'Authorization': 'Bearer YOUR_API_KEY' } // Remplace `YOUR_API_KEY` par ta clé API réelle
      });
      setMoonPhase(response.data.phase); // Stocke la phase lunaire
    } catch (error) {
      console.error('Erreur lors de la récupération de la phase lunaire:', error);
      setMoonPhase('Non disponible'); // Gestion des erreurs
    }
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    fetchMoonPhase(date); // Appel API lors de la sélection d'une date
  };

  const handleDreamSubmission = async () => {
    try {
      const existingData = await AsyncStorage.getItem('dreamFormDataArray');
      const formDataArray = existingData ? JSON.parse(existingData) : [];

      // Ajouter le rêve avec la phase lunaire
      formDataArray.push({ dreamText, selectedDate, keywords, typeOfDream, moonPhase });
      await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));
      console.log('AsyncStorage:', await AsyncStorage.getItem('dreamFormDataArray'));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données:', error);
    }

    // Réinitialiser le formulaire
    setDreamText('');
    resetCalendar();
    setKeywords([]);
    setTypeOfDream('');
    setMoonPhase('');
  };

  const resetCalendar = () => {
    setSelectedDate(undefined);
  };

  // Fonction pour ajouter un mot-clé
  const addKeyword = () => {
    if (keywordInput && keywords.length < 3) {
      setKeywords([...keywords, keywordInput]);
      setKeywordInput('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TextInput
          label="Rêve"
          value={dreamText}
          onChangeText={(text) => setDreamText(text)}
          mode="outlined"
          multiline
          numberOfLines={6}
          style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
        />

        {/* Champ pour les mots-clés */}
        <TextInput
          label="Ajouter un mot-clé"
          value={keywordInput}
          onChangeText={(text) => setKeywordInput(text)}
          style={styles.keywordInput}
        />
        <Button mode="text" onPress={addKeyword} disabled={keywords.length >= 3}>
          Ajouter un mot-clé
        </Button>

        {/* Affichage des mots-clés */}
        <View style={styles.keywordsContainer}>
          {keywords.map((keyword, index) => (
            <Chip key={index} onClose={() => setKeywords(keywords.filter((_, i) => i !== index))}>
              {keyword}
            </Chip>
          ))}
        </View>

        <CalendarComponent selectedDate={selectedDate} onDateSelect={handleDateSelection} /> 

        {/* Affichage de la phase lunaire */}
        {moonPhase && (
          <Text style={styles.moonPhaseText}>Phase lunaire : {moonPhase}</Text>
        )}

        {/* Sélection du type de rêve */}
        <View style={styles.dropdownContainer}>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button mode="outlined" onPress={() => setMenuVisible(true)}>
                {typeOfDream || "Sélectionner le type de rêve"} 
              </Button>
            }
          >
            <Menu.Item onPress={() => { setTypeOfDream("🌔​Rêve ordinaire"); setMenuVisible(false); }} title="Rêve ordinaire" />
            <Menu.Item onPress={() => { setTypeOfDream("🌙​Rêve lucide"); setMenuVisible(false); }} title="Rêve lucide" />
            <Menu.Item onPress={() => { setTypeOfDream("😨​Cauchemar"); setMenuVisible(false); }} title="Cauchemar" />
            <Divider />
          </Menu>
        </View>

        <Button mode="contained" onPress={handleDreamSubmission} style={styles.button}>
          Soumettre
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  container: { padding: 16, alignItems: 'center' },
  input: { marginBottom: 16 },
  keywordInput: { width: width * 0.15, alignSelf: 'center', marginBottom: 8 },
  keywordsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10, justifyContent: 'center' },
  dropdownContainer: { marginVertical: 10, width: width * 0.14, alignSelf: 'center' },
  button: { marginTop: 8 },
  moonPhaseText: { fontSize: 16, fontWeight: 'bold', color: '#333', marginVertical: 10 },
});
