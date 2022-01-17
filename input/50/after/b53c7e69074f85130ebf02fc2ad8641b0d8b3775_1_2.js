function SSB_updateButtonEnabledState() {
    let shareButton = this.shareButton;
    if (shareButton)
      shareButton.hidden = !Social.provider || !Social.provider.enabled ||
                           !Social.provider.port;
  }