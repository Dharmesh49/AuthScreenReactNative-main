import {StyleSheet} from 'react-native';
import COLORS from '../consts/color';

const STYLES = StyleSheet.create({
  inputContainer: {
    marginTop: 12,
    flex: 1,
    height: 50,
    borderRadius: 0,
    flexDirection: 'row',
    borderColor: '#AAAAAA',
    borderWidth: 3,
  },
  input: {
    paddingLeft: 30,
    flex: 1,
    fontSize: 18,
  },
  inputIcon: {marginTop: 15, position: 'absolute'},
  btnPrimary: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

  btnSecondary: {
    height: 50,
    borderWidth: 1,
    borderColor: '#a5a5a5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
  },
  btnImage: {width: 20, height: 20, marginLeft: 5},

  line: {height: 1, width: 30, backgroundColor: '#a5a5a5'},
});

export default STYLES;
