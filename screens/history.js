import { Alert, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../components/AuthProvider';
import { gray } from './home';

const { width } = Dimensions.get('window');

export default function History() {
  const { accountData, setAccountData } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState('oldest-newest');

  const radioButtonsData = [
    {
      id: '1',
      label: 'Oldest-Newest',
      value: 'oldest-newest',
      selected: true,
      labelStyle: { fontSize: 10 }
    },
    {
      id: '2',
      label: 'Newest-Oldest',
      value: 'newest-oldest',
      labelStyle: { fontSize: 10 }
    },
  ];

  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  const clearHistory = () => {
    Alert.alert("Are you sure you wish to clear all history?", [
      {
        text: 'Confirm',
        onPress: () => setAccountData((prev) => ({ ...prev, history: [] })),
      },
      { text: 'Cancel' },
    ]);
  };

  const handleRadioButtonPress = (radioButtonsArray) => {
    setRadioButtons(radioButtonsArray);
    const selectedButton = radioButtonsArray.find((button) => button.selected);
    setSelectedOrder(selectedButton.value);
  };

  if (!accountData) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: gray, fontSize: 15 }}>No Account Data</Text>
      </SafeAreaView>
    );
  }

  const sortedHistory = selectedOrder === 'newest-oldest'
    ? [...accountData.history].reverse()
    : accountData.history;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ borderWidth: 0, alignItems: 'center', padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>History</Text>
      </View>
    

      <FlatList
        data={sortedHistory}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          alignItems: accountData.history.length === 0 ? 'center' : 'flex-start',
          justifyContent: accountData.history.length === 0 ? 'center' : 'flex-start',
          width: '100%',
          minHeight: 600,
          borderWidth: 0,
          padding: 15,
          gap: 10,
        }}
        ListEmptyComponent={
          <Text style={{ color: gray, fontSize: 15 }}>No Medication History</Text>
        }
        renderItem={({ item }) => (
          <View style={{
            flexDirection:"row",
            borderWidth: 0,
            width: width - 30, // Subtracting padding to fit within the screen
            height: 140,
            borderRadius: 10,
            padding: 15,
            backgroundColor:'#ebedeb',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            // Android Shadow
            elevation: 5,
          }}>
            
            <View style={{gap:5 , borderWidth:0, }}>
                <Text style={{fontWeight:"bold", fontSize:25}}>{item.medname}</Text>
                <Text style={{color:gray, fontSize:15}}>{item.category}</Text>
                
                <View style={{flexDirection:'row',top:15}}>
                    <Text style={{fontSize:20,}}>Medication Taken @ </Text>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>{item.time}</Text>
                </View>
            </View>
            <View style={{borderWidth:0, justifyContent:'flex-start', padding:5}}>
                <Text style={{color:gray}}>{item.timestamp}</Text>
            </View>

          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});