function SocialUI_observe(subject, topic, data) {
    switch (topic) {
      case "social:pref-changed":
        SocialShareButton.updateButtonHiddenState();
        SocialToolbar.updateButtonHiddenState();
        break;
      case "social:ambient-notification-changed":
        SocialToolbar.updateButton();
        break;
      case "social:profile-changed":
        SocialToolbar.updateProfile();
        break;
    }
  }