import AVFoundation

@objc(IosPersonalVoice)
class IosPersonalVoice: NSObject {
  private var synthesizer: AVSpeechSynthesizer = AVSpeechSynthesizer()

  @objc(getPersonalVoices:)
  func getPersonalVoices(_ callback: @escaping RCTResponseSenderBlock) {
      var personalVoices: [String] = []
      if #available(iOS 17.0, *) {
          AVSpeechSynthesizer.requestPersonalVoiceAuthorization() { status in
              if status == .authorized {
                  let v = AVSpeechSynthesisVoice.speechVoices().filter { $0.voiceTraits.contains(.isPersonalVoice) }
                  personalVoices = v.map { $0.name }
                  callback([personalVoices])
              } else {
                  callback(["authorization_failed"])
              }
          }
      } else {
          // Fallback on earlier versions
      }
  }
}
