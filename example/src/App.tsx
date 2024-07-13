import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SectionList } from 'react-native';
import { getPersonalVoices } from 'react-native-ios-personal-voice';

export default function App() {
  const [voices, setVoices] = useState<string[]>([]);

  useEffect(() => {
    getPersonalVoices((voices: string[]) => {
      setVoices(voices);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Voices:</Text>
      <SectionList
        sections={[{ data: voices, key: 'voices' }]}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
