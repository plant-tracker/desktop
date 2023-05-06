import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { AppContext, Page } from '../model/AppContext';
import { Layout } from './layout';
import { Tabs } from '../components/Tabs';
import { CardPlant } from '../components/CardPlant';
import { EmptyCard } from '../components/Card';
import { AppButton } from '../components/AppButton';

export function PlantsPage(): JSX.Element {

  const { setPage, userStorage } = useContext(AppContext)!;
  const [selected, setSelected] = React.useState('');

	const filteredList = () => userStorage.plants.filter(p => selected.startsWith(p.type) || selected === 'all');

  return (
    <Layout headerTitle='Your plants' headerIconBlob={require('../assets/icon-plant.svg')}>

      <Tabs tabs={['All', 'Ferns', 'Seed Plants', 'Trees', 'Other']} selectedChanged={label => setSelected(label.toLowerCase()) } />

			<View style={styles.addButton}>
				<AppButton backgroundColor='#2FE1C7' textColor='black' iconBlob={require('../assets/icon-add-plant-2.svg')} narrow={true}
					label='Add plant' onClick={() => setPage(Page.AddPlant)} />
			</View>

      <View style={styles.cards}>
        {filteredList().map((plant, index) => (
          <CardPlant plant={plant} key={index} />
        ))}
        {filteredList().length % 2 === 1 && <EmptyCard />}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
	addButton: {
		marginVertical: 10,
	},
  cards: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: 760,
  },
});
