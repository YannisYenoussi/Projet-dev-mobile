import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Title, Paragraph, TextInput, IconButton } from 'react-native-paper';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

export default function DreamList() {
  const [dreams, setDreams] = useState([]);
  const [filteredDreams, setFilteredDreams] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await AsyncStorage.getItem('dreamFormDataArray');
          const dreamFormDataArray = data ? JSON.parse(data) : [];
          setDreams(dreamFormDataArray);
          setFilteredDreams(dreamFormDataArray);
        } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
          setDreams([]);
          setFilteredDreams([]);
        }
      };
      fetchData();
      return () => {
        console.log('DreamList a perdu le focus.');
      };
    }, [])
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredDreams(dreams);
      return;
    }
    const filtered = dreams.filter((dream) =>
      dream.keywords && dream.keywords.some((keyword) =>
        keyword.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredDreams(filtered);
  };

  // Fonction de suppression
  const handleDeleteDream = async (dreamToDelete) => {
    const updatedDreams = dreams.filter(dream => dream !== dreamToDelete);
    setDreams(updatedDreams);
    setFilteredDreams(updatedDreams);
    await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(updatedDreams));
  };

  // Fonction pour rendre chaque rêve
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.dreamText}>{item.dreamText}</Title>
        <Paragraph style={styles.typeText}>{item.typeOfDream || 'Type de rêve non spécifié'}</Paragraph>
        <Paragraph style={styles.dateText}>{item.selectedDate || 'Date non spécifiée'}</Paragraph>

        {/* Affichage des mots-clés */}
        {item.keywords && item.keywords.length > 0 && (
          <View style={styles.keywordsContainer}>
            {item.keywords.map((keyword, index) => (
              <Paragraph key={index} style={styles.keyword}>
                {keyword}
              </Paragraph>
            ))}
          </View>
        )}
        
        <IconButton 
          icon="trash-can" // Icône de poubelle
          color="red" // Couleur de l'icône
          size={20} // Taille de l'icône
          onPress={() => handleDeleteDream(item)} 
          style={styles.deleteButton}
        />
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Rêves :</Text>
      <TextInput
        label="Rechercher par mots-clés"
        value={searchQuery}
        onChangeText={handleSearch}
        mode="outlined"
        style={styles.searchInput}
      />
      {filteredDreams.length > 0 ? (
        <FlatList
          data={filteredDreams}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.emptyText}>Aucun rêve trouvé.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  searchInput: {
    marginBottom: 16,
    alignSelf: 'center',
    width: '90%',
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#fff',
  },
  dreamText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  typeText: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#fff',
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  keyword: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#e0e0e0',
    padding: 4,
    borderRadius: 4,
    marginRight: 4,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  list: {
    paddingBottom: 16,
  },
  deleteButton: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
});
