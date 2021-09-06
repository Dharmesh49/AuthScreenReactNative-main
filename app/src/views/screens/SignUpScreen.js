/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {SafeAreaView, View, Text, TextInput} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import COLORS from '../../consts/color';
import STYLES from '../../styles';
import {firebase} from '../../firebase/config';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
        };
        const usersRef = firebase.firestore().collection('users');
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate('Home', {user: data});
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
          <View style={{marginTop: 70, marginLeft: '30%'}}>
            <Text
              style={{fontSize: 27, fontWeight: 'bold', color: COLORS.dark}}>
              Register
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
              Email
            </Text>
            <View style={STYLES.inputContainer}>
              <TextInput
                style={STYLES.input}
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
            </View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
              Password
            </Text>
            <View style={STYLES.inputContainer}>
              <TextInput
                style={STYLES.input}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
            </View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
              Confirm Password
            </Text>
            <View style={STYLES.inputContainer}>
              <TextInput
                style={STYLES.input}
                secureTextEntry
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginTop: 40,
                marginBottom: 20,
              }}>
              <Text style={{color: COLORS.light, fontWeight: 'bold'}}>
                Already have an account ?
              </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{color: COLORS.light, fontWeight: 'bold'}}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={STYLES.btnPrimary}
                onPress={() => onRegisterPress()}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: 10}}></View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
