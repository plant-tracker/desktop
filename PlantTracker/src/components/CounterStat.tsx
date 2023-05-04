import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppStyles from '../AppStyles';

type CounterStatProps = {
	count: number,
  label: string,
};

export function CounterStat(props: CounterStatProps): JSX.Element {
  return (
		<View style={styles.content}>
			<Text style={styles.number}>
        { props.count }
      </Text>
			<Text style={styles.name}>
        { props.label }
      </Text>
		</View>
	);
}

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  number: {
    ...AppStyles.text,
    fontSize: 32,
    fontWeight: '500',
  },

  name: {
    ...AppStyles.text,
    fontSize: 16,
    fontWeight: '500',
  },
});
