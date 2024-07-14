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

  // Method to check if a certain voice is a personal voice
  @objc(isPersonalVoice:callback:)
  func isPersonalVoice(_ voice: String, callback: @escaping RCTResponseSenderBlock) {
    if #available(iOS 17.0, *) {
      let voice = AVSpeechSynthesisVoice.speechVoices().first { $0.name == voice }
      if let voice = voice {
        if voice.voiceTraits.contains(.isPersonalVoice) {
          callback([true])
        } else {
          callback([false])
        }
      } else {
        callback([false])
      }
    } else {
      // Fallback on earlier versions
      callback([false])
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

  // Method to speak a text using a personal voice with pitch and rate
  @objc(speakPersonalVoice:voice:pitch:rate:)
  func speakPersonalVoice(_ text: String, voice: String, pitch: Float, rate: Float) {
    if #available(iOS 17.0, *) {
      let voice = AVSpeechSynthesisVoice.speechVoices().first { $0.name == voice }
      if let voice = voice {
        let utterance = AVSpeechUtterance(string: text)
        utterance.voice = voice
        utterance.pitchMultiplier = pitch
        utterance.rate = rate
        synthesizer.speak(utterance)
      }
    }
  }
}
