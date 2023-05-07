import React, { useContext } from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AppStyles from '../AppStyles';
import { AppButton } from '../components/AppButton';
import { AppContext, Page } from '../model/AppContext';
import { authorize, downloadUserData } from '../model/firebase';

export function StartPage(): JSX.Element {

  const { setPage, setUserStorage } = useContext(AppContext)!;

  const [email, setEmail] = React.useState('jakub.gelczynski@studenci.collegiumwitelona.pl');
  const [password, setPassword] = React.useState('trackerplant');
  const [loginError, setLoginError] = React.useState(' ');
  const [loading, setLoading] = React.useState(false);

  const login = async () => {
    setLoading(true);
    const res = await authorize(email, password);
    console.log('Login', res);
    if (res.type === 'ok') {
      const userStorage = await downloadUserData();
      console.log('Downloaded userStorage', userStorage);
      setUserStorage(userStorage);
      setPage(Page.Home);
    } else {
      setLoginError(res.error);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <ImageBackground source={require('../assets/background.png')} resizeMode='repeat' style={styles.background}>

          <View style={styles.header}>
            <Image source={require('../assets/logo.png')} style={styles.header.icon} />
            <Text style={styles.header.text}>Plant Tracker</Text>
          </View>

          {/* <AppButton backgroundColor='black' textColor='white' iconBlob={require('../assets/icon-apple.png')}
            label='Continue with Apple' onClick={() => setPage(Page.Home)} />
          <AppButton backgroundColor='#1877f2' textColor='white' iconBlob={require('../assets/icon-fb.png')}
            label='Continue with Facebook' onClick={() => setPage(Page.Home)} />
           <AppButton backgroundColor='white' textColor='black' hoverBackgroundColor='#efefef' iconBlob={require('../assets/icon-google.png')}
            label='Continue with Google' onClick={() => authGoogle()} /> */}

          <View style={{width: 400}}>
            <View style={AppStyles.field}>
              <Text style={AppStyles.field.label}>Email</Text>
              <TextInput style={AppStyles.field.input} onChangeText={setEmail} value={email} />
            </View>

            <View style={AppStyles.field}>
              <Text style={AppStyles.field.label}>Password</Text>
              <TextInput style={AppStyles.field.input} onChangeText={setPassword} value={password} secureTextEntry={true} />
            </View>
          </View>

          <Text style={styles.error}>{loginError}</Text>

          <AppButton backgroundColor='#2FE1C7' textColor='black' label='Login' onClick={() => login()} disabled={loading} />

          <Text style={[AppStyles.text, {margin: 10}]}>or</Text>
          <AppButton backgroundColor='#3ddc84' textColor='black' iconBlob={require('../assets/icon-android.png')}
            label='Download Android App' onClick={() => Linking.openURL('https://github.com/plant-tracker/mobile')} />

        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#afffba',
  },
  header: {
    margin: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    icon: {
      width: 70,
      height: 70
    },
    text: {
      ...AppStyles.text,
      fontSize: 36,
    },
  },
  error: {
    ...AppStyles.text,
    color: 'red',
  },
});
