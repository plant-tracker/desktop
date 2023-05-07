import React, { useContext, useEffect } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
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
import { repository } from '../model/firebase';

export type AddTaskProps = {
	plant: Plant;
  editedTask?: Task;
};

export function AddTaskPage(props: AddTaskProps): JSX.Element {

  const plant = props.plant;
  const editedReminder = props.editedTask?.reminder?.type === 'once' ? undefined : props.editedTask?.reminder;

  const { setPageWithPlant, userStorage } = useContext(AppContext)!;

  const [name, onChangeName] = React.useState(props.editedTask?.name || getTitle('water'));
  const [type, onChangeType] = React.useState<TaskType>(props.editedTask?.type || 'water');
  const [xDays, onChangeXDays] = React.useState(editedReminder?.everyXDays ? ('' + editedReminder?.everyXDays) : '1');
  const [hours, onChangeHours] = React.useState(editedReminder?.atHour ? ('' + editedReminder?.atHour) : '12');
  const [minutes, onChangeMinutes] = React.useState(editedReminder?.atMinute ? ('' + editedReminder?.atMinute) : '00');

  let previousName = name;
  useEffect(() => {
    if (name === '' || name === previousName)
      onChangeName(getTitle(type));
    previousName = name;
  }, [type]);

  const validate = (value: string, min: number, max: number): boolean => {
    return !(value.length === 0 || !/^\d+$/.test(value) || parseInt(value) < min || parseInt(value) > max);
  };

  const save = async () => {
    if (!name || !type || !validate(xDays, 1, 365) || !validate(hours, 0, 23) || !validate(minutes, 0, 59) ) {
      Alert.alert('Please fill in all fields');
      return;
    }

    const task: Task = {
      plant,
      created: new Date(),
      name,
      type,
      reminder: {
        type: 'repeat',
        everyXDays: parseInt(xDays),
        atHour: parseInt(hours),
        atMinute: parseInt(minutes),
      },
    };

    if (props.editedTask) {
      Object.assign(props.editedTask, task);
      await repository.updatePlant(plant, userStorage.tasks);
    } else {
      userStorage.tasks.push(task);
      await repository.updatePlant(plant, userStorage.tasks);
    }
    setPageWithPlant(Page.Plants, plant);
  };

  return (
    <Layout headerTitle='Add task' headerIconBlob={require('../assets/icon-add-task.svg')} onSave={() => save()}>

      <Text style={styles.header}>Related plant:</Text>

      <CardPlant plant={plant} />

      <View style={styles.row}>
        <Image source={require('../assets/icon-calendar.svg')} />
        <Text>Date added: {formatDate(plant.created)}</Text>
      </View>

      <View style={[styles.card, {marginTop: 30}]}>

        <View style={AppStyles.field}>
          <Text style={[AppStyles.field.label, {marginTop: 0}]}>Type</Text>
          <View style={AppStyles.field.select}>
            <Picker selectedValue={type} onValueChange={(itemValue, itemIndex) => onChangeType(itemValue)} >
              <Picker.Item label="Water" value="water" />
              <Picker.Item label="Fertilize" value="fertilize" />
              <Picker.Item label="Spray" value="spray" />
              <Picker.Item label="Prune" value="prune" />
            </Picker>
          </View>
        </View>

        <View style={AppStyles.field}>
          <Text style={AppStyles.field.label}>Short description</Text>
          <TextInput style={AppStyles.field.input} onChangeText={onChangeName} value={name} placeholder='Franek, Czarek, etc.' placeholderTextColor='#B8BCCA' />
        </View>

        <Text style={AppStyles.field.label}>Frequency:</Text>

        <View style={styles.row}>
          <Text>Repeat every</Text>
          <NumberInput style={AppStyles.field.input} onChangeText={onChangeXDays} value={xDays} maxValue={366} />
          <Text>day(s)</Text>
        </View>

        <View style={[styles.row, {marginTop: 10}]}>
          <Text>at time</Text>
          <NumberInput style={AppStyles.field.input} onChangeText={onChangeHours} value={hours} maxValue={23} />
          <Text>h</Text>
          <NumberInput style={AppStyles.field.input} onChangeText={onChangeMinutes} value={minutes} maxValue={59} />
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
});
