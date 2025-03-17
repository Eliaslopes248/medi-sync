import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navy } from './home';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioGroup from "react-native-radio-buttons-group";
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

export default function InputMeds() {
  const { accountData, setAccountData } = useAuth();
  const [selectedId, setSelectedId] = useState(null);

  const categories = [
    { label: "Cardiovascular", value: "cardiovascular" },
    { label: "Respiratory", value: "respiratory" },
    { label: "Gastrointestinal", value: "gastrointestinal" },
    { label: "Neurological", value: "neurological" },
    { label: "Endocrine", value: "endocrine" },
    { label: "Musculoskeletal", value: "musculoskeletal" },
    { label: "Dermatological", value: "dermatological" },
    { label: "Infectious Disease", value: "infectious_disease" },
    { label: "Psychiatric", value: "psychiatric" },
    { label: "Oncological", value: "oncological" },
    { label: "Ophthalmological", value: "ophthalmological" },
    { label: "Otolaryngological", value: "otolaryngological" },
    { label: "Urological", value: "urological" },
    { label: "Gynecological", value: "gynecological" },
    { label: "Pediatric", value: "pediatric" },
    { label: "Geriatric", value: "geriatric" },
    { label: "Other", value: "other" }
  ];

  const [medication, setMedication] = useState({
    medname: '',
    category: '',
    dose: 0,
    daysTaken: [],
    timesTaken: [],
    instructions: ''
  });

  const radioButtons = [
    { id: "1", label: "Tablet", value: "Tablet" },
    { id: "2", label: "Drinkable", value: "Drinkable" },
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
  const timesOfDay = [
    "12:00 am", "1:00 am", "2:00 am", "3:00 am", "4:00 am", "5:00 am",
    "6:00 am", "7:00 am", "8:00 am", "9:00 am", "10:00 am", "11:00 am",
    "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm",
    "6:00 pm", "7:00 pm", "8:00 pm", "9:00 pm", "10:00 pm", "11:00 pm"
  ];
  

  const handleDoseChange = (amount) => {
    setMedication((prev) => ({
      ...prev,
      dose: amount
    }));
  };

  const handleDayAdd = (day) => {
    if (medication.daysTaken.includes(day)) {
      setMedication((prev) => ({
        ...prev,
        daysTaken: medication.daysTaken.filter(days => days !== day)
      }));
    } else {
      setMedication((prev) => ({
        ...prev,
        daysTaken: [...medication.daysTaken, day]
      }));
    }
  };

  const handleTimeAdd = (time) => {
    if (!medication.timesTaken.includes(time)) {
      setMedication((prev) => ({
        ...prev,
        timesTaken: [...medication.timesTaken, time]
      }));
    } else {
      setMedication((prev) => ({
        ...prev,
        timesTaken: medication.timesTaken.filter(times => times !== time)
      }));
    }
  };

  const addMed = () => {
    setAccountData((prev) => ({
      ...prev,
      medications: [...(prev.medications || []), medication]
    }));
    Alert.alert("Medication Added");
  };

  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState(categories);

  

  return (
    <SafeAreaView>
      <View style={{ borderWidth: 0, alignItems: 'center', padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Add Medication</Text>
      </View>

      <ScrollView style={{ height: '100%', paddingBottom: 0 }}>
        <View style={{ borderWidth: 0, padding: 15 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Medication</Text>
        </View>

        <View style={{ borderWidth: 0, padding: 15 }}>
          <View style={{ width: '100%', backgroundColor: navy, height: 150, borderRadius: 20, padding: 20, gap: 15 }}>
            <TextInput
              placeholderTextColor={'black'}
              placeholder='Enter Medicine Name'
              style={{
                fontSize: 15,
                color: navy,
                borderBottomWidth: 0,
                borderColor: '#edeef0',
                width: '100%',
                backgroundColor: 'white',
                borderRadius: 5,
                padding: 10
              }}
              value={medication.medname}
              onChangeText={(text) => setMedication({ ...medication, medname: text })}
            />

            <DropDownPicker
              open={open}
              value={selectedCategory}
              items={items}
              onChangeValue={(value) => setMedication({ ...medication, category: value })}
              setOpen={setOpen}
              setValue={setSelectedCategory}
              setItems={setItems}
              placeholder="Select Category"
              containerStyle={{ width: '100%' }}
              style={{ backgroundColor: 'white', borderColor: '#ccc' }}
              dropDownContainerStyle={{ backgroundColor: 'white' }}
            />
          </View>
        </View>

        <View style={{ borderWidth: 0, padding: 15 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Tablet Count</Text>
        </View>
        <View style={{ borderWidth: 0, padding: 18, flexDirection: 'row', gap: 15, }}>
          <View style={{borderWidth:0, width:'100%', flexDirection:'row', justifyContent:'space-around',alignItems:'center' }}>
              <TouchableOpacity onPress={()=> setMedication((prev)=>({...prev,dose:medication.dose - 1}))}>
                <MaterialIcons name='remove' style={{color:'black', fontSize:35, backgroundColor:'#dee0e3', padding:5, borderRadius:'50%'}}/>
              </TouchableOpacity>

              <Text style={{fontSize:25}}>{medication.dose}</Text>

              <TouchableOpacity onPress={()=> setMedication((prev)=>({...prev,dose:medication.dose + 1}))}>
                <MaterialIcons name='add' style={{color:'black', fontSize:35, backgroundColor:'#dee0e3', padding:5, borderRadius:'50%'}}/>
              </TouchableOpacity>
          </View>


        </View>

        <View style={{ borderWidth: 0, padding: 15 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Days Taken</Text>
        </View>

        <View style={{
          borderWidth: 0,
          width: "100%",
          height: 60,
          padding: 10,
          paddingLeft: 15,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          gap: 20,
          flexWrap: 'wrap'
        }}>
          {daysOfWeek.map((day) => (
            <TouchableOpacity
              key={day}
              value={day}
              onPress={() => handleDayAdd(day)}
              style={{
                backgroundColor: medication.daysTaken.includes(day) ? navy : '#dee0e3',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                aspectRatio: 1,
                width: 50,
                height: 50,
              }}
            >
              <Text style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: medication.daysTaken.includes(day) ? 'white' : 'black'
              }}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ borderWidth: 0, padding: 15, top: 80 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Times</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            paddingHorizontal: 10,
          }}
          style={{
            borderWidth: 0,
            width: "100%",
            height: 60,
            top: 80
          }}
        >
          {timesOfDay.map((time, index) => (
            <TouchableOpacity
              onPress={() => handleTimeAdd(time)}
              key={index}
              style={{
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
                width: 50,
                height: 50,
                borderRadius: 5,
                padding: 5,
                backgroundColor: medication.timesTaken.includes(time) ? navy : '#dee0e3',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ textAlign: 'center', fontWeight: 'bold', color: medication.timesTaken.includes(time) ? 'white' : 'black' }}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ borderWidth: 0, padding: 15, top: 80 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Description</Text>
        </View>

        <View style={{ width: "100%", padding: 10, height: 180, borderWidth: 0, top: 75 }}>
          <TextInput onChangeText={(text) => setMedication((prev) => ({ ...prev, instructions: text }))} placeholder='Enter Brief Description...' style={{ width: '100%', backgroundColor: '#dee0e3', height: 150, borderRadius: 15, padding: 10, justifyContent: "flex-start" }} />
        </View>

        <View style={{ width: "100%", padding: 20, borderWidth: 0, top: 60, height: 170 }}>
          <TouchableOpacity style={{ backgroundColor: navy, width: '100%', borderRadius: 30, alignItems: 'center' }}>
            <Text onPress={addMed} style={{ color: "white", padding: 20, fontSize: 16, fontWeight: 'bold' }}>Add Medication</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});