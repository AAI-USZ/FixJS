function SocialUI_showProfile() {
    if (Social.provider)
      openUILink(Social.provider.profile.profileURL);
  }