import React, { PropsWithChildren, useContext } from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppStyles from '../AppStyles';
import { AppButton } from '../components/AppButton';
import { AppContext, Page } from '../model/AppContext';
import { IconButton } from '../components/IconButton';
import { FlexAlignType } from 'react-native-windows/types';
import { CounterStat } from '../components/CounterStat';
import { logout } from '../model/firebase';

type LayoutProps = {
  headerIconBlob: any,
  headerTitle: string,
  onSave?: () => void,
}

export function Layout(props: PropsWithChildren<LayoutProps>): JSX.Element {

  const { page, setPage, userStorage } = useContext(AppContext)!;

  const logoutAndRedirect = async () => {
    await logout();
    setPage(Page.Start);
  };

  const buttonsDefault = <>
    <AppButton backgroundColor='#3ddc84' textColor='black' iconBlob={require('../assets/icon-android.png')} narrow={true}
      label='Download Android App' onClick={() => Linking.openURL('https://github.com/plant-tracker/mobile')} />
    <IconButton iconBlob={require('../assets/icon-github.svg')} onClick={() => Linking.openURL('https://github.com/plant-tracker')} />
  </>;
  const buttonsSave = <>
    <AppButton backgroundColor='#2FE1C7' textColor='black' iconBlob={require('../assets/icon-save.svg')} narrow={true}
      label='Save' onClick={() => props.onSave?.()} />
    <AppButton backgroundColor='#E4A834' textColor='black' iconBlob={require('../assets/icon-cancel.svg')} narrow={true}
      label='Cancel' onClick={() => setPage(Page.Plants)} />
  </>;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <ImageBackground source={require('../assets/background.png')} resizeMode='repeat' style={styles.background}>

          <View style={styles.leftBar}>

            <View style={styles.leftBar.iconsTop}>
              <IconButton iconBlob={require('../assets/icon-home.png')} label='Home' onClick={() => setPage(Page.Home)} />
              <IconButton iconBlob={require('../assets/icon-plant.svg')} label='Plants' onClick={() => setPage(Page.Plants)} />
              <IconButton iconBlob={require('../assets/icon-add.png')} label='Add plant' onClick={() => setPage(Page.AddPlant)} />
            </View>

            <View style={styles.leftBar.iconsBottom}>
              <IconButton iconBlob={require('../assets/icon-settings.svg')} label='Settings' onClick={() => setPage(Page.Settings)} />
              <IconButton iconBlob={require('../assets/icon-logout.png')} label='Log out' onClick={() => logoutAndRedirect() } />
            </View>

          </View>

          <View style={styles.rightSide}>

            <ScrollView>
              <View style={styles.rightSide.mainContent}>

                <View style={styles.header}>
                  <Image source={props.headerIconBlob} style={styles.header.icon} />
                  <Text style={styles.header.text}> {props.headerTitle} </Text>
                </View>

                {props.children}
              </View>
            </ScrollView>

            <View style={styles.rightSide.bottomBar}>

              <View style={styles.rightSide.bottomBar.stats}>

                <CounterStat count={userStorage.plants.length} label='Plants' />
                <CounterStat count={userStorage.tasks.length} label='Tasks' />

              </View>

              <View style={styles.rightSide.bottomBar.buttons}>
              { (page !== Page.AddPlant && page !== Page.AddTask) ? buttonsDefault : buttonsSave }
              </View>

            </View>

          </View>

        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const borderRight = {
  borderStyle: 'solid' as any,
  borderWidth: 0,
  borderColor: '#e2e2e2',
  borderTopWidth: 0,
  borderEndWidth: 2,
};
const borderTop = {
  borderStyle: 'solid' as any,
  borderWidth: 0,
  borderColor: '#e2e2e2',
  borderTopWidth: 2,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  background: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
  },
  leftBar: {
    backgroundColor: '#ffffff',
    width: 150,
    ...borderRight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    iconsTop: {
      margin: 20,
      gap: 40,
    },
    iconsBottom: {
      marginBottom: -20,
      gap: 40,
    },
  },
  rightSide: {
    display: 'flex',
    flex: 1,
    mainContent: {
      flex: 1,
      alignItems: 'center' as FlexAlignType,
    },
    bottomBar: {
      backgroundColor: '#ffffff',
      height: 100,
      ...borderTop,
      flexDirection: 'row' as any,
      stats: {
        marginLeft: 40,
        gap: 40,
        flex: 1,
        flexDirection: 'row' as any,
      },
      buttons: {
        marginRight: 10,
        display: 'flex' as any,
        flexDirection: 'row' as any,
        alignItems: 'center' as FlexAlignType,
      },
    },
  },
  header: {
    margin: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    icon: {
      height: 50,
      width: 40,
    },
    text: {
      ...AppStyles.text,
      fontSize: 36,
      fontWeight: '600' as any,
    },
  },
});
