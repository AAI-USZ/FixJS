function SocialUI_init() {
    Services.obs.addObserver(this, "social:pref-changed", false);
    Social.init(this._providerReady.bind(this));
  }