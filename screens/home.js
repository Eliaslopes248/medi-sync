import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../components/AuthProvider';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

export const navy = '#2a4066';
export const gray = '#918f8e';
export const lightgray = '#dee0e3';
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
const fullname_daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday'];

export default function Home({ route }) {
  const { accountData, setAccountData } = useAuth();
  const [currDay, setCurrDay] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    const today = new Date().getDay();
    setCurrDay(today);
    setSelectedDay(today);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const today = new Date().getDay();
      setSelectedDay(today);
    }, [])
  );

  const handleDaySelect = (index) => {
    setSelectedDay(index);
  };

  const handleTimeSelect = (medIndex, time) => {
    setSelectedTime({ medIndex, time });
  };

  const handleMarkAsTaken = (medIndex, time) => {
    if (!accountData || !accountData.medications) return;

    const med = accountData.medications[medIndex];
    const today = new Date();
    const timestamp = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    const medication_taken = {
      medname: med.medname,
      category: med.category,
      dose: med.dose,
      time: time,
      timestamp: timestamp,
    };

    setAccountData((prev) => {
      const updatedMedications = prev.medications.map((med, index) => {
        if (index === medIndex) {
          const updatedTimesTaken = med.timesTaken.filter((t) => t !== time);
          return { ...med, timesTaken: updatedTimesTaken };
        }
        return med;
      }).filter((med) => med.timesTaken.length > 0);

      const updatedHistory = [...prev.history, medication_taken];

      return {
        ...prev,
        medications: updatedMedications,
        history: updatedHistory,
      };
    });

    setSelectedTime(null);
    Alert.alert("Success", "Medication marked as taken");
  };

  const medication_stack = selectedDay !== null && accountData && accountData.medications
    ? accountData.medications.filter((med) => med.daysTaken.includes(daysOfWeek[selectedDay]))
    : [];

  return (
    <SafeAreaView>
      <ScrollView style={{height:"100%"}}>
        <View style={{ borderWidth: 0, width: "100%", height: 80, flexDirection: 'row', padding: 15, alignItems: 'center' }}>
          <MaterialIcons name='person' style={{ color: navy, fontSize: 55 }} />
          <View style={{ left: 10, gap: 5 }}>
            <Text style={{ color: '#918f8e' }}>Welcome back</Text>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Elias Lopes 👋</Text>
          </View>
        </View>

        <View style={{ borderWidth: 0, padding: 15 }}>
          <Text style={{ color: '#918f8e' }}>Daily Schedule</Text>
        </View>
        <View style={{ borderWidth: 0, paddingTop: 0, flexDirection: 'row', justifyContent: 'space-evenly' }}>
          {daysOfWeek.map((day, index) => (
            <TouchableOpacity
              key={day}
              onPress={() => handleDaySelect(index)}
              style={{
                padding: 6,
                borderRadius: '50%',
                aspectRatio: 1,
                backgroundColor: selectedDay === index ? navy : lightgray,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={{ color: selectedDay === index ? 'white' : navy }}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{width:'100%', borderWidth:0, padding:15,top:20}}>
            <Text style={{fontWeight:'bold', fontSize:18}}>{fullname_daysOfWeek[selectedDay]}</Text>
        </View>

        <View 
        style={{width:'100%',
                borderWidth:0, 
                minHeight:200, 
                top:15, 
                padding:10,
                alignItems: medication_stack.length > 0 ? 'flex-start':'center', 
                justifyContent: medication_stack.length > 0 ? 'flex-start':'center',
                gap:20
                }}>

          {medication_stack.length > 0 ? 
          medication_stack.map((med, index) => (
            <View key={index} style={{ justifyContent:'space-between',padding: 0, width:'100%', borderWidth:0, borderRadius:12, height:150, backgroundColor:'#dedede',flexDirection:'row'}}>
            <View style={{padding:15}}>
              
              <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                <Text style={{fontSize:25, fontWeight:'bold'}}>{med.medname}: </Text>
                <Text style={{fontSize:25, color:gray, fontSize:20}}>{med.dose} tablets</Text>
              
              </View>
              <Text style={{fontSize:15, top:5, color:gray}}>{med.category}</Text>
              <ScrollView style={{ borderWidth:0, top:5,}} contentContainerStyle={{alignItems:'center', gap:15}} horizontal>
                {med.timesTaken.map((time, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => handleTimeSelect(index, time)}
                    style={{
                      borderWidth: 1,
                      padding: 5,
                      backgroundColor: selectedTime?.medIndex === index && selectedTime?.time === time ? navy : '#dee0e3',
                    }}
                  >
                    <Text style={{ color: selectedTime?.medIndex === index && selectedTime?.time === time ? 'white' : 'black' }}>{time}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
                <View style={{borderWidth:0, height:'100%', padding:10, right:0, justifyContent:'space-between'}}>
                    <TouchableOpacity style={{top:10}}>
                        <MaterialIcons name='info' style={{color:navy, fontSize:30,}}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleMarkAsTaken(index, selectedTime?.time)}
                      style={{padding:10, backgroundColor:navy, color:'white', borderRadius:2, right:15, bottom:15}}
                    >
                        <Text style={{color:'white', fontWeight:'bold',}}>Mark as Taken</Text>
                    </TouchableOpacity>

                </View>
            </View>
          )):
          
          <Text style={{color:gray}}>No Medications Today</Text>
          }
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});