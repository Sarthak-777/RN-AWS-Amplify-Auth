import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  loginLabel: {
    color: 'black',
    fontSize: 12,
    fontWeight: '500',
  },

  inputField: {
    height: 45,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    marginHorizontal: -10,
  },

  inputStyle: {
    fontSize: 14,
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -20,
    marginBottom: 10,
  },
});

export default styles;
