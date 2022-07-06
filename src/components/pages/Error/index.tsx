import { useRouter } from '@/lib/Router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

interface ErrorProps {
  code: number;
  message: string;
}

export default function Error(props: ErrorProps) {
  const router = useRouter();
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => setCounter((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    counter === 0 && router.setPath('/listcities');
  }, [counter]);

  return (
    <View style={styles.container}>
      <Text style={styles.code}>
        {props.code} {':('}
      </Text>
      <Text style={styles.message}>{props.message}</Text>
      <Text style={styles.subMessage}>Redirecting to home in {counter}s...</Text>
    </View>
  );
}
