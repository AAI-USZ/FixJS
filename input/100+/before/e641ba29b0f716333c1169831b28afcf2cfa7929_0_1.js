function() {
      /*
       * Currently checking:
       * 1. That we're in a mobile web build (mulberry.Device.os is "browser").
       * 2. Support for webkit prefixes, which rules out non-webkit browsers.
       * 3. Support for touch events.
       * 4. Support for Web SQL.
       * 5. If Android, support for >= 2.2 (we can't test for improper
       *    implementation of background-size: contain/cover in 2.1)
       * */

      var div = document.createElement('div'),
          device = mulberry.Device,
          supportsMulberry,
          supportsWebSql,
          supportsWebkitPrefixes,
          isOldAndroid;

      if (device.environment != 'browser') {
        return true;
      }

      if (window.location.hostname === 'localhost') {
        return true;
      }

      supportsWebkitPrefixes = typeof div.style.webkitTransform !== 'undefined';
      supportsTouch = 'ontouchstart' in document.documentElement;

      // this check is to allow desktop browser support which don't have ontouchstart
      if (!supportsTouch && (device.os === 'android' || device.os === 'ios')) {
        return false; //android and ios devices need to support touch
      }
      supportsWebSql = 'openDatabase' in window;
      isOldAndroid = device.environment === 'browser' && device.os === 'android' && device.browserVersion < 2.2;

      supportsMulberry = supportsWebkitPrefixes &&
                         supportsWebSql &&
                         !isOldAndroid;

      return supportsMulberry;
    }