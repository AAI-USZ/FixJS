function([a1, a2, a3, a4, a5, a6, a7, a8, a9, a10,
                                         a11, a12, a13, a14, a15, a16, a17, a18, a19, a20,
                                         a21]) {

    do_check_neq(a1, null);
    do_check_eq(a1.id, "addon1@tests.mozilla.org");
    do_check_eq(a1.type, "extension");
    do_check_eq(a1.version, "1.0");
    do_check_eq(a1.optionsURL, "chrome://test/content/options.xul");
    do_check_eq(a1.optionsType, AddonManager.OPTIONS_TYPE_DIALOG);
    do_check_eq(a1.aboutURL, "chrome://test/content/about.xul");
    do_check_eq(a1.iconURL, "chrome://test/skin/icon.png");
    do_check_eq(a1.icon64URL, "chrome://test/skin/icon64.png");
    do_check_eq(a1.icons[32], "chrome://test/skin/icon.png");
    do_check_eq(a1.icons[64], "chrome://test/skin/icon64.png");
    do_check_eq(a1.name, "Test Addon 1");
    do_check_eq(a1.description, "Test Description");
    do_check_eq(a1.creator, "Test Creator");
    do_check_eq(a1.homepageURL, "http://www.example.com");
    do_check_eq(a1.developers[0], "Test Developer 1");
    do_check_eq(a1.developers[1], "Test Developer 2");
    do_check_eq(a1.translators[0], "Test Translator 1");
    do_check_eq(a1.translators[1], "Test Translator 2");
    do_check_eq(a1.contributors[0], "Test Contributor 1");
    do_check_eq(a1.contributors[1], "Test Contributor 2");
    do_check_true(a1.isActive);
    do_check_false(a1.userDisabled);
    do_check_false(a1.appDisabled);
    do_check_true(a1.isCompatible);
    do_check_true(a1.providesUpdatesSecurely);
    do_check_eq(a1.blocklistState, AM_Ci.nsIBlocklistService.STATE_NOT_BLOCKED);

    do_check_neq(a2, null);
    do_check_eq(a2.id, "addon2@tests.mozilla.org");
    do_check_true(a2.isActive);
    do_check_false(a2.userDisabled);
    do_check_false(a2.appDisabled);
    do_check_true(a2.providesUpdatesSecurely);

    do_check_neq(a3, null);
    do_check_eq(a3.id, "addon3@tests.mozilla.org");
    do_check_false(a3.isActive);
    do_check_false(a3.userDisabled);
    do_check_true(a3.appDisabled);
    do_check_false(a3.providesUpdatesSecurely);

    do_check_neq(a4, null);
    do_check_eq(a4.id, "addon4@tests.mozilla.org");
    do_check_true(a4.isActive);
    do_check_false(a4.userDisabled);
    do_check_false(a4.appDisabled);
    do_check_true(a4.providesUpdatesSecurely);

    do_check_neq(a5, null);
    do_check_true(a5.isActive);
    do_check_false(a5.userDisabled);
    do_check_false(a5.appDisabled);
    do_check_true(a5.isCompatible);

    do_check_neq(a6, null);
    do_check_true(a6.isActive);
    do_check_false(a6.userDisabled);
    do_check_false(a6.appDisabled);
    do_check_true(a6.isCompatible);

    do_check_neq(a7, null);
    do_check_false(a7.isActive);
    do_check_false(a7.userDisabled);
    do_check_true(a7.appDisabled);
    do_check_false(a7.isCompatible);

    do_check_neq(a8, null);
    do_check_false(a8.isActive);
    do_check_false(a8.userDisabled);
    do_check_true(a8.appDisabled);
    do_check_false(a8.isCompatible);

    do_check_neq(a9, null);
    do_check_true(a9.isActive);
    do_check_false(a9.userDisabled);
    do_check_false(a9.appDisabled);
    do_check_true(a9.isCompatible);

    do_check_neq(a10, null);
    do_check_false(a10.isActive);
    do_check_false(a10.userDisabled);
    do_check_true(a10.appDisabled);
    do_check_false(a10.isCompatible);

    do_check_neq(a11, null);
    do_check_true(a11.isActive);
    do_check_false(a11.userDisabled);
    do_check_false(a11.appDisabled);
    do_check_true(a11.isCompatible);

    do_check_neq(a12, null);
    do_check_false(a12.isActive);
    do_check_false(a12.userDisabled);
    do_check_true(a12.appDisabled);
    do_check_false(a12.isCompatible);

    do_check_neq(a13, null);
    do_check_false(a13.isActive);
    do_check_false(a13.userDisabled);
    do_check_true(a13.appDisabled);
    do_check_false(a13.isCompatible);

    do_check_neq(a14, null);
    do_check_true(a14.isActive);
    do_check_false(a14.userDisabled);
    do_check_false(a14.appDisabled);
    do_check_true(a14.isCompatible);

    do_check_neq(a15, null);
    do_check_true(a15.isActive);
    do_check_false(a15.userDisabled);
    do_check_false(a15.appDisabled);
    do_check_true(a15.isCompatible);
    do_check_true(a15.providesUpdatesSecurely);

    do_check_neq(a16, null);
    do_check_true(a16.isActive);
    do_check_false(a16.userDisabled);
    do_check_false(a16.appDisabled);
    do_check_true(a16.isCompatible);
    do_check_true(a16.providesUpdatesSecurely);

    do_check_neq(a17, null);
    do_check_true(a17.isActive);
    do_check_false(a17.userDisabled);
    do_check_false(a17.appDisabled);
    do_check_true(a17.isCompatible);
    do_check_eq(a17.optionsURL, "chrome://test/content/options.xul");
    do_check_eq(a17.optionsType, AddonManager.OPTIONS_TYPE_INLINE);

    do_check_neq(a18, null);
    do_check_true(a18.isActive);
    do_check_false(a18.userDisabled);
    do_check_false(a18.appDisabled);
    do_check_true(a18.isCompatible);
    if (Services.prefs.getBoolPref("extensions.alwaysUnpack")) {
      do_check_eq(a18.optionsURL, Services.io.newFileURI(profileDir).spec +
                                  "addon18@tests.mozilla.org/options.xul");
    } else {
      do_check_eq(a18.optionsURL, "jar:" + Services.io.newFileURI(profileDir).spec +
                                  "addon18@tests.mozilla.org.xpi!/options.xul");
    }
    do_check_eq(a18.optionsType, AddonManager.OPTIONS_TYPE_INLINE);

    do_check_eq(a19, null);

    do_check_neq(a20, null);
    do_check_true(a20.isActive);
    do_check_false(a20.userDisabled);
    do_check_false(a20.appDisabled);
    do_check_true(a20.isCompatible);
    do_check_eq(a20.optionsURL, "chrome://test/content/options.xul");
    do_check_eq(a20.optionsType, AddonManager.OPTIONS_TYPE_DIALOG);

    do_check_neq(a21, null);
    do_check_true(a21.isActive);
    do_check_false(a21.userDisabled);
    do_check_false(a21.appDisabled);
    do_check_true(a21.isCompatible);
    do_check_eq(a21.optionsURL, "chrome://test/content/options.xul");
    do_check_eq(a21.optionsType, AddonManager.OPTIONS_TYPE_TAB);

    do_test_finished();
  }