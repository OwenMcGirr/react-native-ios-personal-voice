import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import {
  requestAccessToPersonalVoices,
  getPersonalVoices,
  personalVoicesAuthorized,
  personalVoicesNotAuthorized,
  deviceDoesNotSupportPersonalVoices,
  deviceDoesNotAllowPersonalVoices,
  isPersonalVoice,
  speakPersonalVoice,
} from 'react-native-ios-personal-voice';

export default function App() {
  const [status, setStatus] = useState('');
  const [voices, setVoices] = useState<string[]>([]);

  useEffect(() => {
    requestAccessToPersonalVoices((status) => {
      setStatus(status);
    });

    getPersonalVoices((voices) => {
      setVoices(voices);
    });

    personalVoicesAuthorized((authorized) => {
      if (authorized) {
        console.log('authorized');
      }
    });

    personalVoicesNotAuthorized((notAuthorized) => {
      if (notAuthorized) {
        console.log('not authorized');
      }
    });

    deviceDoesNotSupportPersonalVoices((notSupported) => {
      if (notSupported) {
        console.log('not supported');
      }
    });

    deviceDoesNotAllowPersonalVoices((notAllowed) => {
      if (notAllowed) {
        console.log('not allowed');
      }
    });

    isPersonalVoice('Alex', (isPersonalVoice) => {
      if (isPersonalVoice) {
        console.log('Alex is a personal voice');
      } else {
        console.log('Alex is not a personal voice');
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>status: {status}</Text>
      <Text>voices: {voices.join(', ')}</Text>
      <Button
        title="Speak"
        onPress={() => {
          if (voices[0] !== undefined) {
            speakPersonalVoice('Hello, world!', voices[0], 1.0, 0.5);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
