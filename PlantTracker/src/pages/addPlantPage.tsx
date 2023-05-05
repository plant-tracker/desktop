import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppContext, Page } from '../model/AppContext';
import { Layout } from './layout';
import { AppButton } from '../components/AppButton';
import AppStyles from '../AppStyles';
import { Plant } from '../model/plant';

export function AddPlantPage(): JSX.Element {

  const { setPage, userStorage } = useContext(AppContext)!;

  const [name, onChangeName] = React.useState('');
  const [type, onChangeType] = React.useState('fern');
  const [species, onChangeSpecies] = React.useState('');
  const [location, onChangeLocation] = React.useState('');
  const [temperature, setTemperature] = React.useState('cool');
  const [light, setLight] = React.useState('low');
  const [humidity, setHumidity] = React.useState('low');

  const save = () => {
    if (!name || !location || !species) {
      Alert.alert('Please fill in all fields');
      return;
    }

    const plant: Plant = {
      addedDate: new Date(),
      humidity: humidity as any,
      light: light as any,
      location: location,
      name: name,
      photoUrl: 'TODO', //
      species: species,
      temperature: temperature as any,
      type: type as any,
    };

    // TODO - API
    userStorage.plants.push(plant);
    setPage(Page.Plants);
  };

  const { width } = Dimensions.get('window');
  const [dimensions, setDimensions] = useState({width});

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window}) => setDimensions({width: window.width}),
    );
    return () => subscription?.remove();
  });

  return (
    <Layout headerTitle='Add plant' headerIconBlob={require('../assets/icon-plant.svg')} onSave={() => save()}>

      <View style={[styles.columns, {flexDirection: dimensions.width >= 150 + 360 * 2 + 20 ? 'row' : 'column'}]}>

        <View style={styles.card}>
          <Text style={styles.header}>Plant photo</Text>
          {/* <Image TODO /> */}
          <View style={styles.buttonsRow}>
            <AppButton backgroundColor='#2FE1C7' textColor='black' iconBlob={require('../assets/icon-add-plant-2.svg')} narrow={true}
              label='Upload image 1' onClick={() => console.log('TODO')} buttonStyle={styles.button} textStyle={{ fontSize: 16 }} />
            <AppButton backgroundColor='#FF5D5D' textColor='black' iconBlob={require('../assets/icon-trash.svg')} narrow={true}
              label='Delete image' onClick={() => console.log('TODO')} buttonStyle={styles.button} textStyle={{ fontSize: 16 }} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.header}>General</Text>

          <View style={styles.field}>
            <Text style={styles.field.label}>Name</Text>
            <TextInput style={styles.field.input} onChangeText={onChangeName} value={name} placeholder='Franek, Czarek, etc.' placeholderTextColor='#B8BCCA' />
          </View>

          <View style={styles.field}>
            <Text style={styles.field.label}>Type</Text>
            {/* <Dropdown label="Select Item" data={type} onSelect={onChangeType} /> */}
            <View style={[styles.field.select]}>
              <Picker selectedValue={type} onValueChange={(itemValue, itemIndex) => onChangeType(itemValue)} >
                <Picker.Item label="Fern" value="fern" />
                <Picker.Item label="Seed plant" value="seed plant" />
                <Picker.Item label="Tree" value="tree" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.field.label}>Species</Text>
            <TextInput style={styles.field.input} onChangeText={onChangeSpecies} value={species} placeholder='Monstera deliciosa' placeholderTextColor='#B8BCCA' />
          </View>

          <View style={styles.field}>
            <Text style={styles.field.label}>Location</Text>
            <TextInput style={styles.field.input} onChangeText={onChangeLocation} value={location} placeholder='Living room' placeholderTextColor='#B8BCCA' />
          </View>

          <Text style={[styles.header, {marginTop: 20}]}>Preferences</Text>

          <View style={[styles.buttonsRow, {marginTop: 20}]}>
            <Image source={require('../assets/icon-temp.svg')} />
            <Text>Temperature</Text>
          </View>
          <View style={styles.buttonsRow}>
            <AppButton backgroundColor={temperature === 'cool' ? '#2FE1C7' : '#BEFFE4'} textColor='black' narrow={true}
              label='Cool' onClick={() => setTemperature('cool')} buttonStyle={styles.button} textStyle={{ fontSize: 16 }} />
            <AppButton backgroundColor={temperature === 'room' ? '#2FE1C7' : '#BEFFE4'} textColor='black' narrow={true}
              label='Room' onClick={() => setTemperature('room')} buttonStyle={styles.button} textStyle={{ fontSize: 16 }} />
            <AppButton backgroundColor={temperature === 'warm' ? '#2FE1C7' : '#BEFFE4'} textColor='black' narrow={true}
              label='Warm' onClick={() => setTemperature('warm')} buttonStyle={styles.button} textStyle={{ fontSize: 16 }} />
          </View>

          <View style={[styles.buttonsRow, {marginTop: 20}]}>
            <Image source={require('../assets/icon-sun.svg')} />
            <Text>Light</Text>
          </View>
          <View style={styles.buttonsRow}>
            <AppButton backgroundColor={light === 'low' ? '#2FE1C7' : '#BEFFE4'} textColor='black' narrow={true}
              label='Low' onClick={() => setLight('low')} buttonStyle={styles.button} textStyle={{ fontSize: 16 }} />
            <AppButton backgroundColor={light === 'medium' ? '#2FE1C7' : '#BEFFE4'} textColor='black' narrow={true}
              label='Medium' onClick={() => setLight('medium')} buttonStyle={styles.button} textStyle={{ fontSize: 16 }} />
            <AppButton backgroundColor={light === 'high' ? '#2FE1C7' : '#BEFFE4'} textColor='black' narrow={true}
              label='High' onClick={() => setLight('high')} buttonStyle={styles.button} textStyle={{ fontSize: 16 }} />
          </View>

          <View style={[styles.buttonsRow, {marginTop: 20}]}>
            <Image source={require('../assets/icon-water.svg')} />
            <Text>Humidity</Text>
          </View>
          <View style={styles.buttonsRow}>
            <AppButton backgroundColor={humidity === 'low' ? '#2FE1C7' : '#BEFFE4'} textColor='black' narrow={true}
              label='Low' onClick={() => setHumidity('low')} buttonStyle={styles.button} textStyle={{ fontSize: 16 }} />
            <AppButton backgroundColor={humidity === 'medium' ? '#2FE1C7' : '#BEFFE4'} textColor='black' narrow={true}
              label='Medium' onClick={() => setHumidity('medium')} buttonStyle={styles.button} textStyle={{ fontSize: 16 }} />
            <AppButton backgroundColor={humidity === 'high' ? '#2FE1C7' : '#BEFFE4'} textColor='black' narrow={true}
              label='High' onClick={() => setHumidity('high')} buttonStyle={styles.button} textStyle={{ fontSize: 16 }} />
          </View>

        </View>

      </View>

    </Layout>
  );
}

const styles = StyleSheet.create({
  columns: {
    display: 'flex',
    gap: 15,
    marginBottom: 20,
  },
  header: {
    ...AppStyles.text,
    fontSize: 20,
    fontWeight: '600',
  },
  card: {
		width: 360,
    padding: 20,
		backgroundColor: 'white',
		borderRadius: 10,
  },
  buttonsRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 0,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  field: {
    gap: 8,
    label: {
      fontSize: 16,
      fontWeight: '600',
      marginTop: 20,
    } as TextStyle,
    input: {
      backgroundColor: '#F8FAFC',
      borderWidth: 1,
      borderColor: '#2FE1C7',
      borderRadius: 4,
    } as ViewStyle,
    select: {
      backgroundColor: '#F8FAFC',
      borderWidth: 1,
      borderColor: '#2FE1C7',
      borderRadius: 4,
      overflow: "hidden",
      height: 33,
    } as ViewStyle,
  },
});
