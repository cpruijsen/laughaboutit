/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTBundleURLProvider.h"

#import "RCTRootView.h"

// add FB login.
#import <FBSDKCoreKit/FBSDKCoreKit.h>

// add Digits by Fabric
#import <Fabric/Fabric.h>
#import <DigitsKit/DigitsKit.h>
#import <Crashlytics/Crashlytics.h>


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application 
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  
  // add Digits by Fabric
  // , [Crashlytics class]
    [Fabric with:@[[Digits class], [Crashlytics class]]];

  
  [[FBSDKApplicationDelegate sharedInstance] application:application
    didFinishLaunchingWithOptions:launchOptions];
  // Add any custom logic here. 
  
  NSURL *jsCodeLocation;
  
  // optional code to log all fonts in the app - see the printout in XCode, this helps in creating styles with custom fonts for captions and
  // for caption rendering on the swipe cards (stretch goal).

  for (NSString* family in [UIFont familyNames])
  {
    NSLog(@"%@", family);
    for (NSString* name in [UIFont fontNamesForFamilyName: family])
    {
      NSLog(@" %@", name);
    }
  }

  [[RCTBundleURLProvider sharedSettings] setDefaults];
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"test2"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

// https://developers.facebook.com/docs/ios/getting-started/
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url 
    sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {

  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
    openURL:url
    sourceApplication:sourceApplication
    annotation:annotation
  ];
  // Add any custom logic here.
  return handled;
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  [FBSDKAppEvents activateApp];
}

@end
