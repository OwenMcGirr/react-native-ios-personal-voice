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

// export the requestAccessToPersonalVoices function with the callback pattern
export function requestAccessToPersonalVoices(
  callback: (status: string) => void
): void {
  return IosPersonalVoice.requestAccessToPersonalVoices(callback);
}

// export the personalVoicesAuthorized function with the callback pattern
export function personalVoicesAuthorized(
  callback: (authorized: boolean) => void
): void {
  return IosPersonalVoice.personalVoicesAuthorized(callback);
}

// export the personalVoicesNotAuthorized function with the callback pattern
export function personalVoicesNotAuthorized(
  callback: (notAuthorized: boolean) => void
): void {
  return IosPersonalVoice.personalVoicesNotAuthorized(callback);
}

// export the deviceDoesNotSupportPersonalVoices function with the callback pattern
export function deviceDoesNotSupportPersonalVoices(
  callback: (notSupported: boolean) => void
): void {
  return IosPersonalVoice.deviceDoesNotSupportPersonalVoices(callback);
}

// export the deviceDoesNotAllowPersonalVoices function with the callback pattern
export function deviceDoesNotAllowPersonalVoices(
  callback: (notAllowed: boolean) => void
): void {
  return IosPersonalVoice.deviceDoesNotAllowPersonalVoices(callback);
}

// export the getPersonalVoices function with the callback pattern
export function getPersonalVoices(callback: (voices: string[]) => void): void {
  return IosPersonalVoice.getPersonalVoices(callback);
}
