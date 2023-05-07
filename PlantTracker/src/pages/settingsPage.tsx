import React, { useContext } from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { AppContext } from '../model/AppContext';
import { Layout } from './layout';
import AppStyles from '../AppStyles';
import { LinkButton } from '../components/LinkButton';

export function SettingsPage(): JSX.Element {

  const { enableNotifications, setEnableNotifications } = useContext(AppContext)!;

  return (
    <Layout headerTitle='Settings' headerIconBlob={require('../assets/icon-settings.svg')}>
      <View style={{width: 300}}>

        <Text style={styles.header}>General</Text>

        <View style={styles.row}>
          <Switch
            trackColor={{true: '#BEFFE4', false: '#A9A9A9'}}
            thumbColor={enableNotifications ? '#3ddc84' : '#000000'}
            style={{borderColor: '#A9A9A9', transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }, {translateX: 13}] }}
            onValueChange={setEnableNotifications}
            value={enableNotifications}
          />
          <Text style={styles.label}>Enable notifications</Text>
        </View>

        <Text style={[styles.header, {marginTop: 30}]}>Actions</Text>

        <LinkButton iconBlob={require('../assets/icon-github.svg')} label='View source code' onClick={() => console.log('TODO')} />

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
    marginBottom: 10,
  },
  label: {
    ...AppStyles.text,
    fontSize: 18,
  },
  addTaskButton: {
    paddingHorizontal: 50,
    alignSelf: 'center',
  },
});
