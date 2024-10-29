import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Chip, Menu, Divider } from 'react-native-paper';
import CalendarComponent from './calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DreamToEdit({ route, navigation }) {
  const { dreamToEdit } = route.params;
  const [dreamText, setDreamText] = useState(dreamToEdit.dreamText || '');
  const [selectedDate, setSelectedDate] = useState(dreamToEdit.selectedDate || undefined);
  const [keywords, setKeywords] = useState(dreamToEdit.keywords || []);
  const [keywordInput, setKeywordInput] = useState('');
  const [typeOfDream, setTypeOfDream] = useState(dreamToEdit.typeOfDream || '');
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    setDreamText(dreamToEdit.dreamText);
    setSelectedDate(dreamToEdit.selectedDate);
    setKeywords(dreamToEdit.keywords);
    setTypeOfDream(dreamToEdit.typeOfDream);
  }, [dreamToEdit]);

  const handleSaveChanges = async () => {
    try {
      const existingData = await AsyncStorage.getItem('dreamFormDataArray');
      const formDataArray = existingData ? JSON.parse(existingData) : [];

      const updatedDreams = formDataArray.map(dream =>
        dream === dreamToEdit ? { ...dream, dreamText, selectedDate, keywords, typeOfDream } : dream
      );

      await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(updatedDreams));
      navigation.goBack();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des modifications:', error);
    }
  };

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
          onChangeText={setDreamText}
          mode="outlined"
          multiline
          numberOfLines={6}
          style={styles.input}
        />

        <TextInput
          label="Ajouter un mot-clé"
          value={keywordInput}
          onChangeText={setKeywordInput}
          style={styles.keywordInput}
        />
        <Button mode="text" onPress={addKeyword} disabled={keywords.length >= 3}>
          Ajouter un mot-clé
        </Button>

        <View style={styles.keywordsContainer}>
          {keywords.map((keyword, index) => (
            <Chip key={index} onClose={() => setKeywords(keywords.filter((_, i) => i !== index))}>
              {keyword}
            </Chip>
          ))}
        </View>

        <CalendarComponent selectedDate={selectedDate} onDateSelect={setSelectedDate} />

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

        <Button mode="contained" onPress={handleSaveChanges} style={styles.button}>
          Sauvegarder les modifications
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  container: { padding: 16, alignItems: 'center' },
  input: { marginBottom: 16, width: '80%' },
  keywordInput: { width: '60%', alignSelf: 'center', marginBottom: 8 },
  keywordsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10, justifyContent: 'center' },
  dropdownContainer: { marginVertical: 10 },
  button: { marginTop: 8 },
});
