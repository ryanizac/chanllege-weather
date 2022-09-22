import { icons, IconType } from '@/icons';
import { Pressable, ViewStyle } from 'react-native';

type SvgButtonProps = ViewStyle & {
  svg: IconType;
  onPress?: () => void;
};

export function SvgButton({ svg, onPress, ...style }: SvgButtonProps) {
  const Svg = icons[svg];

  return (
    <Pressable style={style} onPress={onPress}>
      <Svg width={24} height={24} fill="#fff" />
    </Pressable>
  );
}
