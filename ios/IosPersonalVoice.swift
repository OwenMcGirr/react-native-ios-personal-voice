import AVFoundation

@objc(IosPersonalVoice)
class IosPersonalVoice: NSObject {
  private var synthesizer: AVSpeechSynthesizer = AVSpeechSynthesizer()

  // Method to request access to personal voices
  @objc(requestAccessToPersonalVoices:)
  func requestAccessToPersonalVoices(_ callback: @escaping RCTResponseSenderBlock) {
    if #available(iOS 17.0, *) {
      AVSpeechSynthesizer.requestPersonalVoiceAuthorization() { status in
        if status == .authorized {
          callback([true])
        } else {
          callback([false])
        }
      }
    } else {
      // Fallback on earlier versions
      callback([false])
    }
  }

  // Method to check if personal voices are authorized
  @objc(personalVoicesAuthorized:)
  func personalVoicesAuthorized(_ callback: @escaping RCTResponseSenderBlock) {
    if #available(iOS 17.0, *) {
      let status = AVSpeechSynthesizer.personalVoiceAuthorizationStatus
      if status == .authorized {
        callback([true])
      } else {
        callback([false])
      }
    } else {
      // Fallback on earlier versions
      callback([false])
    }
  }

  // Method to check if personal voices are not authorized yet
  @objc(personalVoicesNotAuthorized:)
  func personalVoicesNotAuthorized(_ callback: @escaping RCTResponseSenderBlock) {
    if #available(iOS 17.0, *) {
      let status = AVSpeechSynthesizer.personalVoiceAuthorizationStatus
      if status == .notDetermined {
        callback([true])
      } else {
        callback([false])
      }
    } else {
      // Fallback on earlier versions
      callback([true])
    }
  }

  // Method to check if the device does not support personal voices 
  @objc(deviceDoesNotSupportPersonalVoices:)
  func deviceDoesNotSupportPersonalVoices(_ callback: @escaping RCTResponseSenderBlock) {
    if #available(iOS 17.0, *) {
      let status: AVSpeechSynthesizer.PersonalVoiceAuthorizationStatus = AVSpeechSynthesizer.personalVoiceAuthorizationStatus
      if status == .unsupported {
        callback([true])
      } else {
        callback([false])
      }
    } else {
      // Fallback on earlier versions
      callback([true])
    }
  }

  // Method to check if the device does not allow personal voices
  @objc(deviceDoesNotAllowPersonalVoices:)
  func deviceDoesNotAllowPersonalVoices(_ callback: @escaping RCTResponseSenderBlock) {
    if #available(iOS 17.0, *) {
      let status = AVSpeechSynthesizer.personalVoiceAuthorizationStatus
      if status == .denied {
        callback([true])
      } else {
        callback([false])
      }
    } else {
      // Fallback on earlier versions
      callback([true])
    }
  }

  // Method to get personal voices after authorization
  @objc(getPersonalVoices:)
  func getPersonalVoices(_ callback: @escaping RCTResponseSenderBlock) {
    if #available(iOS 17.0, *) {
      let status = AVSpeechSynthesizer.personalVoiceAuthorizationStatus
      if status == .authorized {
        let personalVoices = AVSpeechSynthesisVoice.speechVoices().filter { $0.voiceTraits.contains(.isPersonalVoice) }.map { $0.name }
        callback([personalVoices])
      } else {
        callback(["authorization_required"])
      }
    } else {
      // Fallback on earlier versions
      callback(["not_supported"])
    }
  }
}