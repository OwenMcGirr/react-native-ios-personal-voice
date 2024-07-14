#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(IosPersonalVoice, NSObject)

RCT_EXTERN_METHOD(requestAccessToPersonalVoices:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(personalVoicesAuthorized:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(personalVoicesNotAuthorized:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(deviceDoesNotSupportPersonalVoices:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(deviceDoesNotAllowPersonalVoices:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(isPersonalVoice:(NSString *)voice callback:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(getPersonalVoices:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(speakPersonalVoice:(NSString *)text voice:(NSString *)voice pitch:(float)pitch rate:(float)rate)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
