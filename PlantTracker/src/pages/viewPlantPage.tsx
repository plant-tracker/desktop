import React, { useContext } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AppContext, Page } from '../model/AppContext';
import { Layout } from './layout';
import { CardPlant } from '../components/CardPlant';
import { AppButton } from '../components/AppButton';
import { Plant } from '../model/plant';
import AppStyles from '../AppStyles';
import { LinkButton } from '../components/LinkButton';
import { CardTask } from '../components/CardTask';
import { formatDate } from '../model/calculateNextTime';
import { repository } from '../model/firebase';

export type ViewPlantProps = {
	plant: Plant;
};

export function ViewPlantPage(props: ViewPlantProps): JSX.Element {

  const { setPageWithPlant, setPage, userStorage } = useContext(AppContext)!;

  const plant = props.plant;

  const deletePlantAsk = () => {
    Alert.alert('Delete plant', 'Are you sure you want to delete this plant?', [
      {
        text: 'Cancel', style: 'cancel',
      },
      {
        text: 'DELETE', style: 'destructive', onPress: () => deletePlantReally(),
      },
    ]);
  };

  const deletePlantReally = async () => {
    await repository.deletePlant(plant);
    userStorage.plants = userStorage.plants.filter(p => p !== plant);
    // delete all related tasks
    userStorage.tasks = userStorage.tasks.filter(t => t.plant !== plant);
    setPage(Page.Plants);
  };

  // this happens after clicking Delete Plant
  if (!plant) return <></>;

  return (
    <Layout headerTitle='Plant info' headerIconBlob={require('../assets/icon-plant.svg')}>

      <View style={styles.columns}>

        {/* left column */}
        <View style={styles.column}>
          <CardPlant plant={plant} />

          <View style={{padding: 10}}>

            <View style={styles.row}>
              <Image source={require('../assets/icon-calendar.svg')} />
              <Text style={AppStyles.text}>Date added: {formatDate(plant.created)}</Text>
            </View>

            <Text style={[styles.header, {marginTop: 20, marginBottom: 10}]}>Actions</Text>

            <LinkButton iconBlob={require('../assets/icon-edit-doc.svg')} label='Edit plant' onClick={() => setPageWithPlant(Page.AddPlant, plant)} />
            <View style={{marginTop: 10}} />
            <LinkButton iconBlob={require('../assets/icon-trash.svg')} label='Delete plant' onClick={() => deletePlantAsk()} />

          </View>

        </View>

        {/* right column */}
        <View style={styles.column}>
          <Text style={styles.header}>Tasks</Text>

          <AppButton backgroundColor='#2FE1C7' textColor='black' iconBlob={require('../assets/icon-add-task.svg')} narrow={true}
              label='Add task' onClick={() => setPageWithPlant(Page.AddTask, plant)} buttonStyle={styles.addTaskButton} textStyle={{ fontSize: 16 }} />

          {userStorage.tasks.filter(t => t.plant === plant).map((task, index) => (
            <CardTask plant={plant} task={task} key={index} />
          ))}
        </View>

      </View>

    </Layout>
  );
}

const styles = StyleSheet.create({
  columns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: 760,
    gap: 40,
  },
  column: {
    width: 360,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  header: {
    ...AppStyles.text,
    fontSize: 20,
    fontWeight: '600',
  },
  addTaskButton: {
    paddingHorizontal: 50,
    alignSelf: 'center',
  },
});
