function() {
        var enabled;
        try {
          // set a test cookie with a duration of 1 second.
          // NOTE - The Android 3.3 and 4.0 default browsers will still pass
          // this check.  This causes the Android browsers to only display the
          // cookies diabled error screen only after the user has entered and
          // submitted input.
          // http://stackoverflow.com/questions/8509387/android-browser-not-respecting-cookies-disabled/9264996#9264996
          document.cookie = "test=true; max-age=1";
          enabled = document.cookie.indexOf("test") > -1;
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