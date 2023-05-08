import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppContext, Page } from '../model/AppContext';
import { Layout } from './layout';
import { AppButton } from '../components/AppButton';
import AppStyles from '../AppStyles';
import { Plant } from '../model/plant';
import { repository } from '../model/firebase';

export type AddPlantProps = {
  editedPlant?: Plant;
};

export function AddPlantPage(props: AddPlantProps): JSX.Element {

  const { setPage, userStorage } = useContext(AppContext)!;

  const [name, onChangeName] = React.useState(props.editedPlant?.name || '');
  const [type, onChangeType] = React.useState(props.editedPlant?.type || 'fern');
  const [species, onChangeSpecies] = React.useState(props.editedPlant?.species || '');
  const [location, onChangeLocation] = React.useState(props.editedPlant?.location || '');
  const [temperature, setTemperature] = React.useState(props.editedPlant?.temperature || 'cool');
  const [light, setLight] = React.useState(props.editedPlant?.light || 'low');
  const [humidity, setHumidity] = React.useState(props.editedPlant?.humidity || 'low');
  const [photoUrl, setPhotoUrl] = React.useState(props.editedPlant?.photoUrl || '');

  const save = async () => {
    if (!name || !location || !species) {
      Alert.alert('Please fill in all fields');
      return;
    }

    const plant: Plant = {
      id: props.editedPlant?.id,
      created: new Date(),
      humidity: humidity as any,
      light: light as any,
      location: location,
      name: name,
      photoUrl: photoUrl,
      species: species,
      temperature: temperature as any,
      type: type as any,
    };

    if (props.editedPlant) {
      await repository.updatePlant(plant, userStorage.tasks);
      Object.assign(props.editedPlant, plant);
    } else {
      await repository.addPlant(plant);
      userStorage.plants.push(plant);
    }
    setPage(Page.Plants);
  };

  const selectPhoto = () => {
    // select file component did not compile for Windows, using just URL
    // But Alert.prompt is also not implemented in RN for Windows...
    // Alert.prompt('Select photo', 'Enter photo URL', setPhotoUrl, undefined, photoUrl, 'url');
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
    <Layout headerTitle={props.editedPlant ? 'Edit plant' : 'Add plant'} headerIconBlob={require('../assets/icon-plant.svg')} onSave={() => save()}>

      <View style={[styles.columns, {flexDirection: dimensions.width >= 150 + 360 * 2 + 20 ? 'row' : 'column'}]}>

        <View style={styles.card}>
          <Text style={styles.header}>Plant photo</Text>
          { photoUrl && <Image style={styles.photo} source={{uri: photoUrl}} /> }

          <View style={AppStyles.field}>
            <Text style={AppStyles.field.label}>Photo URL</Text>
            <TextInput style={AppStyles.field.input} onChangeText={setPhotoUrl} value={photoUrl} placeholder='https://link.com/to/plant/photo.jpg' placeholderTextColor='#B8BCCA' />
          </View>

          <View style={styles.buttonsRow}>
            {/* <AppButton backgroundColor='#2FE1C7' textColor='black' iconBlob={require('../assets/icon-add-plant-2.svg')} narrow={true}
              label='Upload image' onClick={selectPhoto} buttonStyle={styles.button} textStyle={{ fontSize: 16 }} /> */}
            <AppButton backgroundColor='#FF5D5D' textColor='black' iconBlob={require('../assets/icon-trash.svg')} narrow={true}
              label='Delete image' onClick={() => setPhotoUrl('')} buttonStyle={styles.button} textStyle={{ fontSize: 16 }} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.header}>General</Text>

          <View style={AppStyles.field}>
            <Text style={AppStyles.field.label}>Name</Text>
            <TextInput style={AppStyles.field.input} onChangeText={onChangeName} value={name} placeholder='Franek, Czarek, etc.' placeholderTextColor='#B8BCCA' />
          </View>

          <View style={AppStyles.field}>
            <Text style={AppStyles.field.label}>Type</Text>
            {/* <Dropdown label="Select Item" data={type} onSelect={onChangeType} /> */}
            <View style={[AppStyles.field.select]}>
              <Picker selectedValue={type} onValueChange={(itemValue, itemIndex) => onChangeType(itemValue)} >
                <Picker.Item label="Fern" value="fern" />
                <Picker.Item label="Seed plant" value="seed plant" />
                <Picker.Item label="Tree" value="tree" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>
          </View>

          <View style={AppStyles.field}>
            <Text style={AppStyles.field.label}>Species</Text>
            <TextInput style={AppStyles.field.input} onChangeText={onChangeSpecies} value={species} placeholder='Monstera deliciosa' placeholderTextColor='#B8BCCA' />
          </View>

          <View style={AppStyles.field}>
            <Text style={AppStyles.field.label}>Location</Text>
            <TextInput style={AppStyles.field.input} onChangeText={onChangeLocation} value={location} placeholder='Living room' placeholderTextColor='#B8BCCA' />
          </View>

          <Text style={[styles.header, {marginTop: 20}]}>Preferences</Text>

          <View style={[styles.buttonsRow, {marginTop: 20}]}>
            <Image source={require('../assets/icon-temp.svg')} />
            <Text style={AppStyles.text}>Temperature</Text>
          </View>
          <View style={styles.buttonsRow}>
            <AppButton backgroundColor={temperature === 'cool' ? '#2FE1C7' : '#BEFFE4'} textColor='black' narrow={true}
              label='Cool' onClick={() => setTemperature('cool')} buttonStyle={styles.button} textStyle={{ fontSize: 16 }} />
            <AppButton backgroundColor={temperature === 'medium' ? '#2FE1C7' : '#BEFFE4'} textColor='black' narrow={true}
              label='Medium' onClick={() => setTemperature('medium')} buttonStyle={styles.button} textStyle={{ fontSize: 16 }} />
            <AppButton backgroundColor={temperature === 'warm' ? '#2FE1C7' : '#BEFFE4'} textColor='black' narrow={true}
              label='Warm' onClick={() => setTemperature('warm')} buttonStyle={styles.button} textStyle={{ fontSize: 16 }} />
          </View>

          <View style={[styles.buttonsRow, {marginTop: 20}]}>
            <Image source={require('../assets/icon-sun.svg')} />
            <Text style={AppStyles.text}>Light</Text>
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
            <Text style={AppStyles.text}>Humidity</Text>
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
	photo: {
		width: 125,
		height: 125,
		borderRadius: 10,
		resizeMode: 'cover',
	},
});
