function appendFrame(origin, url, name, manifest, manifestURL) {
    var frame = document.createElement('iframe');
    frame.id = 'appframe' + nextAppId++;
    frame.className = 'appWindow';
    frame.setAttribute('mozallowfullscreen', 'true');

    if (manifest.hackNetworkBound) {
      var style = 'font-family: OpenSans,sans-serif;' +
                  'text-align: center;' +
                  'color: white;' +
                  'margin-top: 100px;';

      frame.src = 'data:text/html,' +
        '<body style="background-color: black">' +
        '  <h3 style="' + style + '">' + localizedLoading + '</h3>' +
        '</body>';
    }

    // Note that we don't set the frame size here.  That will happen
    // when we display the app in setDisplayedApp()

    // Most apps currently need to be hosted in a special 'mozbrowser' iframe.
    // They also need to be marked as 'mozapp' to be recognized as apps by the
    // platform.
    frame.setAttribute('mozbrowser', 'true');
    frame.setAttribute('mozapp', manifestURL);

    // Run these apps out of process by default (except when OOP is
    // forced off).  This is temporary: all apps will be out of
    // process.
    //
    // When we're down to just esoteric bugs here (like edge cases in
    // telephony API), this needs to become a blacklist.
    var outOfProcessWhitelist = [
      // Crash when placing call
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=761925
      // Cross-process fullscreen
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=684620
      // Cross-process IME
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=761927
      // Cross-process MediaStorage
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=761930
      // Cross-process settings
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=743018
      // Mouse click not delivered
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=761934
      // Nested content processes
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=761935
      // Stop audio when app dies
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=761936
      // WebGL texture sharing:
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=728524

      //'Browser',
      //   Cross-process IME
      //   Nested content processes

      'Calculator'

      //'Camera',
      //   Cross-process camera control
      //   Cross-process preview stream

      //'Clock',
      //   Cross-process IME (to program alarm)

      //'CrystalSkull',
      //   WebGL texture sharing (for full perf)

      //'CubeVid',
      //   Stop audio when app dies
      //   WebGL texture sharing (for full perf)

      //'Cut The Rope',
      //   Mouse click not delivered
      //   Stop audio when app dies

      //'Dialer',
      //   Crash when placing call
      //   ...

      //'Gallery',
      //   Cross-process MediaStorage

      //'Keyboard'
      //   Cross-process IME

      //'Market',
      //   Cross-process IME
      //   Cross-process mozApps

      //'Messages',
      //   Cross-process IME

      //'Music',
      //   Cross-process MediaStorage
      //   Stop audio when app dies

      //'PenguinPop',
      //   Mouse click not delivered
      //   Stop audio when app dies

      //'Settings',
      //   Cross-process IME
      //   Cross-process settings

      //'Tasks',
      //   Cross-process IME

      //'Template',
      //   Run this in or out of process, depending on what you want
      //   to test.

      //'TowerJelly',
      //   Mouse click not delivered

      //'Video',
      //   Cross-process fullscreen
      //   Cross-process MediaStorage
      //   Stop audio when app dies
    ];
    if (outOfProcessWhitelist.indexOf(name) >= 0) {
      // FIXME: content shouldn't control this directly
      frame.setAttribute('remote', 'true');
    }

    // Add the iframe to the document
    // Note that we have not yet set its src property.
    // In order for the open animation to be smooth, we don't
    // actually set src until the open has finished.
    windows.appendChild(frame);

    // And map the app origin to the info we need for the app
    runningApps[origin] = {
      name: name,
      manifest: manifest,
      frame: frame,
      launchTime: Date.now()
    };

    numRunningApps++;

    // Now animate the window opening and actually set the iframe src
    // when that is done.
    setDisplayedApp(origin, function() {
      frame.src = url;

      if (manifest.fullscreen) {
        frame.mozRequestFullScreen();
      }
    });
  }