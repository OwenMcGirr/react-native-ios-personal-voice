#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(IosPersonalVoice, NSObject)

RCT_EXTERN_METHOD(requestAccessToPersonalVoices:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(personalVoicesAuthorized:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(personalVoicesNotAuthorized:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(deviceDoesNotSupportPersonalVoices:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(deviceDoesNotAllowPersonalVoices:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(getPersonalVoices:(RCTResponseSenderBlock)callback)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
