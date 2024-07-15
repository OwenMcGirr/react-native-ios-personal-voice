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
          if (Platform.OS === 'ios') {
            throw new Error(LINKING_ERROR);
          } else {
            console.warn(
              'react-native-ios-personal-voice is not supported on this platform.'
            );
          }
        },
      }
    );

/**
 * Requests access to personal voices.
 * @param callback - A callback function that takes a status string.
 */
export function requestAccessToPersonalVoices(
  callback: (status: string) => void
): void {
  if (Platform.OS === 'ios') {
    return IosPersonalVoice.requestAccessToPersonalVoices(callback);
  }

  return callback('Not supported on this platform');
}

/**
 * Checks if personal voices are authorized.
 * @param callback - A callback function that takes a boolean indicating authorization.
 */
export function personalVoicesAuthorized(
  callback: (authorized: boolean) => void
): void {
  if (Platform.OS === 'ios') {
    return IosPersonalVoice.personalVoicesAuthorized(callback);
  }

  return callback(false);
}

/**
 * Checks if personal voices are not authorized.
 * @param callback - A callback function that takes a boolean indicating if not authorized.
 */
export function personalVoicesNotAuthorized(
  callback: (notAuthorized: boolean) => void
): void {
  if (Platform.OS === 'ios') {
    return IosPersonalVoice.personalVoicesNotAuthorized(callback);
  }

  return callback(false);
}

/**
 * Checks if the device does not support personal voices.
 * @param callback - A callback function that takes a boolean indicating if not supported.
 */
export function deviceDoesNotSupportPersonalVoices(
  callback: (notSupported: boolean) => void
): void {
  if (Platform.OS === 'ios') {
    return IosPersonalVoice.deviceDoesNotSupportPersonalVoices(callback);
  }

  return callback(false);
}

/**
 * Checks if the device does not allow personal voices.
 * @param callback - A callback function that takes a boolean indicating if not allowed.
 */
export function deviceDoesNotAllowPersonalVoices(
  callback: (notAllowed: boolean) => void
): void {
  if (Platform.OS === 'ios') {
    return IosPersonalVoice.deviceDoesNotAllowPersonalVoices(callback);
  }

  return callback(false);
}

/**
 * Checks if a given voice is a personal voice.
 * @param voice - The voice to check.
 * @param callback - A callback function that takes a boolean indicating if it is a personal voice.
 */
export function isPersonalVoice(
  voice: string,
  callback: (isPersonalVoice: boolean) => void
): void {
  if (Platform.OS === 'ios') {
    return IosPersonalVoice.isPersonalVoice(voice, callback);
  }

  return callback(false);
}

/**
 * Retrieves a list of personal voices.
 * @param callback - A callback function that takes an array of voices.
 */
export function getPersonalVoices(callback: (voices: string[]) => void): void {
  if (Platform.OS === 'ios') {
    return IosPersonalVoice.getPersonalVoices(callback);
  }

  return callback([]);
}

/**
 * Speaks a given text using a specified personal voice.
 * @param text - The text to speak.
 * @param voice - The personal voice to use.
 * @param pitch - The pitch of the speech.
 * @param rate - The rate of the speech.
 */
export function speakPersonalVoice(
  text: string,
  voice: string,
  pitch: number,
  rate: number
): void {
  if (Platform.OS === 'ios') {
    return IosPersonalVoice.speakPersonalVoice(text, voice, pitch, rate);
  }

  return;
}

/**
 * Stops speaking.
 */
export function stopSpeakingPersonalVoice(): void {
  if (Platform.OS === 'ios') {
    return IosPersonalVoice.stopSpeakingPersonalVoice();
  }

  return;
}

/**
 * Checks if the speech synthesizer is speaking.
 * @param callback - A callback function that takes a boolean indicating if the synthesizer is speaking.
 */
export function isSpeakingPersonalVoice(
  callback: (isSpeaking: boolean) => void
): void {
  if (Platform.OS === 'ios') {
    return IosPersonalVoice.isSpeakingPersonalVoice(callback);
  }

  return callback(false);
}
