import { TextInput, TextInputProps } from 'react-native';
import { styles } from './styles';

type InputSearchProps = TextInputProps & {
  value: string;
  setValue: (newValue: string) => void;
};

export function InputSearch({ value, setValue, ...props }: InputSearchProps) {
  return (
    <TextInput
      placeholder="digite..."
      placeholderTextColor="rgba(255,255,255,0.6)"
      style={styles.container}
      value={value}
      onChangeText={setValue}
      {...props}
    />
  );
}
