#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(IosPersonalVoice, NSObject)

RCT_EXTERN_METHOD(getPersonalVoices:(RCTResponseSenderBlock)callback)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
