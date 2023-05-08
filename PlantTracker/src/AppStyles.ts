import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

const color = 'black';

const AppStyles =  StyleSheet.create({
	text: {
		fontSize: 16,
    color,
	},
  field: {
    gap: 8,
    label: {
      color,
      fontSize: 16,
      fontWeight: '600',
      marginTop: 20,
    } as TextStyle,
    input: {
      color,
      backgroundColor: '#F8FAFC',
      borderWidth: 1,
      borderColor: '#2FE1C7',
      borderRadius: 4,
    } as ViewStyle,
    select: {
      color,
      backgroundColor: '#F8FAFC',
      borderWidth: 1,
      borderColor: '#2FE1C7',
      borderRadius: 4,
      overflow: 'hidden',
      height: 33,
    } as ViewStyle,
  },
});

export default AppStyles;
