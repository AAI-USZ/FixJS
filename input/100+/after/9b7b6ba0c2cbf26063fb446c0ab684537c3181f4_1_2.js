function reset() {

    FBWorld.beingPromptedToLogin             = false;
    FBWorld.beingPromptedToLoginOptions      = undefined;
    FBWorld.beingPromptedToLoginCallback     = undefined;
    FBWorld.beingPromptedToLoginSkipConnection = false;
    FBWorld.beingPromptedToConnect           = false;
    FBWorld.beingPromptedToConnectOptions    = undefined;
    FBWorld.beingPromptedToConnectCallback   = undefined;
    FBWorld.beingPromptedToAddPermissions         = false;
    FBWorld.beingPromptedToAddPermissionsOptions  = undefined;
    FBWorld.beingPromptedToAddPermissionsCallback = undefined;
    FBWorld.beingPromptedToShare             = false;
    FBWorld.beingPromptedToShareOptions      = undefined;
    FBWorld.beingPromptedToShareCallback     = undefined;
    FBWorld.resetForcedReturnError();

    // reset cookie
    FBWorld.Helpers.makeMeACookie('fb-stub', null);
  }