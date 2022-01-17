function(aInstall) {
          do_check_false(a1.hasResource("icon.png"));
          do_check_true(aInstall.addon.hasResource("icon.png"));

          restartManager();

          AddonManager.getAddonByID("addon1@tests.mozilla.org", function(newa1) {
            do_check_eq(newa1, null);

            do_test_finished();
          });
        }