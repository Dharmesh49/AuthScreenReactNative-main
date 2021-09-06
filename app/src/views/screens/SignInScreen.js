/* eslint-disable no-alert */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {SafeAreaView, View, Text, TextInput} from 'react-native';
import {firebase} from '../../firebase/config';
import COLORS from '../../consts/color';
import STYLES from '../../styles';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection('users');
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert('User does not exist anymore.');
              return;
            }
            const user = firestoreDocument.data();
            navigation.navigate('Home', {user});
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <SafeAreaView
      style={{paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAwareScrollView
          style={{flex: 1, width: '100%'}}
          keyboardShouldPersistTaps="always">
          <View style={{flexDirection: 'row', marginTop: 40}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 22,
                color: COLORS.dark,
                marginLeft: '40%',
              }}>
              Login
            </Text>
          </View>

          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
              Email
            </Text>
            <View style={STYLES.inputContainer}>
              <TextInput
                underlineColorAndroid="transparent"
                onChangeText={(text) => setEmail(text)}
                value={email}
                autoCapitalize="none"
                style={STYLES.input}
              />
            </View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
              Password
            </Text>
            <View style={STYLES.inputContainer}>
              <TextInput
                onChangeText={(text) => setPassword(text)}
                value={password}
                underlineColorAndroid="transparent"
                style={STYLES.input}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginBottom: 20,
                marginTop: '30%',
              }}>
              <Text style={{color: COLORS.light, fontWeight: 'bold'}}>
                Don`t have an account ?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text
                  style={{
                    color: COLORS.light,
                    fontWeight: 'bold',
                    marginLeft: '5%',
                  }}>
                  Register Now
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={STYLES.btnPrimary}
                onPress={() => onLoginPress()}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginVertical: 20,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}></View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;
