function() {
        var enabled;
        try {
          // NOTE - The Android 3.3 and 4.0 default browsers will still pass
          // this check.  This causes the Android browsers to only display the
          // cookies diabled error screen only after the user has entered and
          // submitted input.
          // http://stackoverflow.com/questions/8509387/android-browser-not-respecting-cookies-disabled

          document.cookie = "__cookiesEnabledCheck=1";
          enabled = document.cookie.indexOf("__cookiesEnabledCheck") > -1;

          // expire the cookie NOW by setting its expires date to yesterday.
          var expires = new Date();
          expires.setDate(expires.getDate() - 1);
          document.cookie = "__cookiesEnabledCheck=; expires=" + expires.toGMTString();
        } catch(e) {
          enabled = false;
        }

        // BEGIN TESTING API
        if (typeof Network.cookiesEnabledOverride === "boolean") {
          enabled = Network.cookiesEnabledOverride;
        }
        // END TESTING API

        complete(onComplete, enabled);
      }