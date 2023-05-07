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
import { getRemaining } from '../model/calculateNextTime';

export function HomePage(): JSX.Element {

  const { setPage, userStorage } = useContext(AppContext)!;
  const [selected, setSelected] = React.useState('');

	const filteredList = () => {
    const list = userStorage.tasks.filter(t => t.type === selected || selected === 'all');
    // sort by remaining time
    list.sort((a, b) => {
      const a1 = getRemaining(a);
      const b1 = getRemaining(b);
      if (a1.type === 'past') return 1;
      if (b1.type === 'past') return -1;
      if (a1.type === 'days' && b1.type === 'days') return a1.days - b1.days;
      if (a1.type === 'days') return 1;
      if (b1.type === 'days') return -1;
      return (a1.seconds + a1.minutes * 60 + a1.hours * 3600 + a1.days * 3600 * 24) -
        (b1.seconds + b1.minutes * 60 + b1.hours * 3600 + b1.days * 3600 * 24);
    });
    return list;
  };

  return (
    <Layout headerTitle='Incoming tasks' headerIconBlob={require('../assets/icon-tasks.svg')}>

      <Tabs tabs={['All', 'Water', 'Fertilize', 'Spray', 'Prune']} selectedChanged={label => setSelected(label.toLowerCase()) } />
      <View style={styles.cards}>
        {filteredList().map((task, index) => (
          <CardPlantWater task={task} key={index} />
        ))}
        {filteredList().length % 2 === 1 && <EmptyCard />}
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
