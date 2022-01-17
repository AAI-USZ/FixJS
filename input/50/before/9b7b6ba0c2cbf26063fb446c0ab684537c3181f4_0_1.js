function promptToLogin(options, callback, skipConnection) {
    FBWorld.beingPromptedToLogin = true;
    FBWorld.beingPromptedToLoginOptions = options;
    FBWorld.beingPromptedToLoginCallback = callback;
    FBWorld.beingPromptedToLoginSkipConnection = skipConnection
  }