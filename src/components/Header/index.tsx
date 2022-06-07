import styles from './styles';
import * as icons from '@/icons';
import { GestureResponderEvent, Pressable, View } from 'react-native';

interface HeaderProps {
  icon: keyof typeof icons;
  onPress?: (event: GestureResponderEvent) => void;
  invert?: boolean;
  children?: JSX.Element | JSX.Element[];
}

export default function Header(props: HeaderProps) {
  const Icon = icons[props.icon];

  return (
    <View style={[styles.conainer, props.invert && { flexDirection: 'row-reverse' }]}>
      {props.children}
      <Pressable onPress={props.onPress}>
        <Icon width={28} height={28} />
      </Pressable>
    </View>
  );
}
