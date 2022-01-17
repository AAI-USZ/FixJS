function acceptDialog()
{
  var appName = gBrandBundle.getString("brandShortName");

  var profilesElement = document.getElementById("profiles");
  var selectedProfile = profilesElement.selectedItem;
  if (!selectedProfile) {
    var pleaseSelectTitle = gProfileManagerBundle.getString("pleaseSelectTitle");
    var pleaseSelect =
      gProfileManagerBundle.getFormattedString("pleaseSelect", [appName]);
    Services.prompt.alert(window, pleaseSelectTitle, pleaseSelect);

    return false;
  }

  var profileLock;

  try {
    profileLock = selectedProfile.profile.lock({ value: null });
  }
  catch (e) {
    if (!selectedProfile.profile.rootDir.exists()) {
      var missingTitle = gProfileManagerBundle.getString("profileMissingTitle");
      var missing =
        gProfileManagerBundle.getFormattedString("profileMissing", [appName]);
      Services.prompt.alert(window, missingTitle, missing);
      return false;
    }

    var lockedTitle = gProfileManagerBundle.getString("profileLockedTitle");
    var locked =
      gProfileManagerBundle.getFormattedString("profileLocked2", [appName, selectedProfile.profile.name, appName]);
    Services.prompt.alert(window, lockedTitle, locked);

    return false;
  }
  gDialogParams.objects.insertElementAt(profileLock.nsIProfileLock, 0, false);

  gProfileService.selectedProfile = selectedProfile.profile;
  updateStartupPrefs();

  gDialogParams.SetInt(0, 1);

  gDialogParams.SetString(0, selectedProfile.profile.name);

  return true;
}