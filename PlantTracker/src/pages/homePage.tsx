import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { AppContext } from '../model/AppContext';
import { Layout } from './layout';
import { Tabs } from '../components/Tabs';
import { CardPlantWater } from '../components/CardPlantWater';
import { EmptyCard } from '../components/Card';

export function HomePage(): JSX.Element {

  const { setPage, userStorage } = useContext(AppContext)!;
  const [selected, setSelected] = React.useState('');

  return (
    <Layout headerTitle='Incoming tasks' headerIconBlob={require('../assets/icon-tasks.svg')}>

      <Tabs tabs={['All', 'Water', 'Fertilize', 'Spray', 'Prune']} selectedChanged={label => setSelected(label.toLowerCase()) } />
      <View style={styles.cards}>
        {userStorage.tasks.filter(t => t.type === selected || selected === 'all').map((task, index) => (
          <CardPlantWater task={task} key={index} />
        ))}
        {userStorage.tasks.filter(t => t.type === selected || selected === 'all').length % 2 === 1 && <EmptyCard />}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  cards: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: 760,
  },
});
