import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-ios-personal-voice' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const IosPersonalVoice = NativeModules.IosPersonalVoice
  ? NativeModules.IosPersonalVoice
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

// export the getPersonalVoices function with the callback pattern
export function getPersonalVoices(callback: (voices: string[]) => void): void {
  return IosPersonalVoice.getPersonalVoices(callback);
}
