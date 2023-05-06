import React, { useContext, useEffect } from 'react';
import {
  Alert,
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
import AppStyles from '../AppStyles';
import { Plant } from '../model/plant';
import { CardPlant } from '../components/CardPlant';
import { formatDate } from '../model/calculateNextTime';
import { Task, TaskType, getTitle } from '../model/task';
import { NumberInput } from '../components/NumberInput';

export type AddTaskProps = {
	plant: Plant;
};

export function AddTaskPage(props: AddTaskProps): JSX.Element {

  const plant = props.plant;

  const { setPageWithPlant, userStorage } = useContext(AppContext)!;

  const [name, onChangeName] = React.useState(getTitle('water'));
  const [type, onChangeType] = React.useState<TaskType>('water');
  const [xDays, onChangeXDays] = React.useState('1');
  const [hours, onChangeHours] = React.useState('12');
  const [minutes, onChangeMinutes] = React.useState('00');

  let previousName = name;
  useEffect(() => {
    if (name === '' || name === previousName)
      onChangeName(getTitle(type));
    previousName = name;
  }, [type]);

  const validate = (value: string, min: number, max: number): boolean => {
    return !(value.length === 0 || !/^\d+$/.test(value) || parseInt(value) < min || parseInt(value) > max);
  };

  const save = () => {
    if (!name || !type || !validate(xDays, 1, 365) || !validate(hours, 0, 23) || !validate(minutes, 0, 59) ) {
      Alert.alert('Please fill in all fields');
      return;
    }

    const task: Task = {
      plant,
      addedDate: new Date(),
      name,
      type,
      reminder: {
        type: 'repeat',
        everyXDays: parseInt(xDays),
        atHour: parseInt(hours),
        atMinute: parseInt(minutes),
      },
    };

    // TODO - API
    userStorage.tasks.push(task);
    setPageWithPlant(Page.Plants, plant);
  };

  return (
    <Layout headerTitle='Add task' headerIconBlob={require('../assets/icon-add-task.svg')} onSave={() => save()}>

      <Text style={styles.header}>Related plant:</Text>

      <CardPlant plant={plant} />

      <View style={styles.row}>
        <Image source={require('../assets/icon-calendar.svg')} />
        <Text>Date added: {formatDate(plant.addedDate)}</Text>
      </View>

      <View style={[styles.card, {marginTop: 30}]}>

        <View style={styles.field}>
          <Text style={[styles.field.label, {marginTop: 0}]}>Type</Text>
          <View style={styles.field.select}>
            <Picker selectedValue={type} onValueChange={(itemValue, itemIndex) => onChangeType(itemValue)} >
              <Picker.Item label="Water" value="water" />
              <Picker.Item label="Fertilize" value="fertilize" />
              <Picker.Item label="Spray" value="spray" />
              <Picker.Item label="Prune" value="prune" />
            </Picker>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.field.label}>Short description</Text>
          <TextInput style={styles.field.input} onChangeText={onChangeName} value={name} placeholder='Franek, Czarek, etc.' placeholderTextColor='#B8BCCA' />
        </View>

        <Text style={styles.field.label}>Frequency:</Text>

        <View style={styles.row}>
          <Text>Repeat every</Text>
          <NumberInput style={styles.field.input} onChangeText={onChangeXDays} value={xDays} maxValue={366} />
          <Text>day(s)</Text>
        </View>

        <View style={[styles.row, {marginTop: 10}]}>
          <Text>at time</Text>
          <NumberInput style={styles.field.input} onChangeText={onChangeHours} value={hours} maxValue={23} />
          <Text>h</Text>
          <NumberInput style={styles.field.input} onChangeText={onChangeMinutes} value={minutes} maxValue={59} />
          <Text>m</Text>
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
  row: {
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
