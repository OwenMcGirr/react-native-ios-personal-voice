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

/**
 * Requests access to personal voices.
 * @param callback - A callback function that takes a status string.
 */
export function requestAccessToPersonalVoices(
  callback: (status: string) => void
): void {
  return IosPersonalVoice.requestAccessToPersonalVoices(callback);
}

/**
 * Checks if personal voices are authorized.
 * @param callback - A callback function that takes a boolean indicating authorization.
 */
export function personalVoicesAuthorized(
  callback: (authorized: boolean) => void
): void {
  return IosPersonalVoice.personalVoicesAuthorized(callback);
}

/**
 * Checks if personal voices are not authorized.
 * @param callback - A callback function that takes a boolean indicating if not authorized.
 */
export function personalVoicesNotAuthorized(
  callback: (notAuthorized: boolean) => void
): void {
  return IosPersonalVoice.personalVoicesNotAuthorized(callback);
}

/**
 * Checks if the device does not support personal voices.
 * @param callback - A callback function that takes a boolean indicating if not supported.
 */
export function deviceDoesNotSupportPersonalVoices(
  callback: (notSupported: boolean) => void
): void {
  return IosPersonalVoice.deviceDoesNotSupportPersonalVoices(callback);
}

/**
 * Checks if the device does not allow personal voices.
 * @param callback - A callback function that takes a boolean indicating if not allowed.
 */
export function deviceDoesNotAllowPersonalVoices(
  callback: (notAllowed: boolean) => void
): void {
  return IosPersonalVoice.deviceDoesNotAllowPersonalVoices(callback);
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
  return IosPersonalVoice.isPersonalVoice(voice, callback);
}

/**
 * Retrieves a list of personal voices.
 * @param callback - A callback function that takes an array of voices.
 */
export function getPersonalVoices(callback: (voices: string[]) => void): void {
  return IosPersonalVoice.getPersonalVoices(callback);
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
  return IosPersonalVoice.speakPersonalVoice(text, voice, pitch, rate);
}
