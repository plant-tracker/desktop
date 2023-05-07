import React from 'react';
import {
  Pressable,
	StyleSheet,
  Text,
	View,
} from 'react-native';
import AppStyles from '../AppStyles';

type TabProps = {
	label: string,
	selected: boolean,
  onClick: () => void,
};

function Tab(props: TabProps): JSX.Element {
  const [hovered, setHovered] = React.useState(false);

  const getStyles = (pressed: boolean) => [
    styles.tab,
		props.selected && styleSelected,
    (hovered || pressed) && styleActive,
  ];

  const styleSelected = { borderColor: '#2FE1C7' };
  const styleActive = { text: { color: '#2FE1C7'} } as any;

  const styles = StyleSheet.create({
    tab: {
			borderStyle: 'solid' as any,
			borderWidth: 0,
			borderBottomWidth: 3,
			paddingHorizontal: 5,

      text: {
        ...AppStyles.text,
        fontSize: 20,
      }
    },
  });

  return (
		<Pressable
      style={({pressed}) => getStyles(pressed)}
      onHoverIn={_ => setHovered(true)}
      onHoverOut={_ => setHovered(false)}
      onPress={props.onClick}
    >
			<Text style={styles.tab.text}>{ props.label }</Text>
		</Pressable>
	);
}

export type TabsProps = {
	tabs: string[],
  selectedChanged: (label: string) => void,
};

export function Tabs(props: TabsProps): JSX.Element {
  const [selected, setSelected] = React.useState(props.tabs[0]);

	React.useEffect(() => props.selectedChanged(selected), [selected]);

  const styles = StyleSheet.create({
    tabs: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
    },
  });

	return (
		<View style={styles.tabs}>
			{ props.tabs.map(label =>
        <Tab label={label} selected={selected === label} onClick={() => setSelected(label)} key={label} />
      )}
		</View>
	);
}
