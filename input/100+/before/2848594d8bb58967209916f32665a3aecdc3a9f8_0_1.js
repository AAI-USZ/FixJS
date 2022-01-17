function appendFrame(origin, url, name, manifest, manifestURL, background) {
    var frame = document.createElement('iframe');
    frame.id = 'appframe' + nextAppId++;
    frame.className = 'appWindow';
    frame.setAttribute('mozallowfullscreen', 'true');
    frame.dataset.frameType = 'window';
    frame.dataset.frameOrigin = origin;

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
      // Nested content processes
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=761935
      // Stop audio when app dies
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=761936
      // w->mApp Assertion
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=775576 
      // Gallery App crash (in IndexedDB)
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=775591
      // Electrolysize b2g-bluetooth
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=755943
      // VolumeService doesn't work when called OOP
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=775833
      // Message App crashes when run OOP
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=775997
      // Dialer doesn't seem to see touches when run OOP
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=776069
      // ICS camera support
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=740997
      // Marketplace app doesn't seem to work when run OOP
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=776086
      // Keyboard always shows up alpha when app using keyboard is run OOP
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=776118
      // Keyboard doesn't show up correctly when app run OOP
      //   https://github.com/mozilla-b2g/gaia/issues/2656
      // UI Test app - Insert Fake Contacts hangs when run OOP (or not OOP)
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=776128
      // UI Test - window.open doesn't work properly when run OOP
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=776129
      // UI Test app - window.close test causes seg fault when run OOP
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=776132
      // UI Test App - Notifications don't work properly when run OOP
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=776134

      //'Browser',
      // - Needs Nested Content Process (bug 761935) for OOP

      'Calculator',
      'Calendar',

      //'Camera',
      // - Camera app doesn't work yet on otoro - bug 740997
      // - When run OOP, VolumeService dies - bug 775833
      //   Cross-process camera control
      //   Cross-process preview stream

      //'Clock',
      //  - OOP - asserts on w->mApp (bug 775576)

      'Contacts',
      // Keyboard always shows up alpha when app using keyboard is run OOP - bug 776118

      'CrystalSkull',

      'CubeVid',
      // - Doesn't crash when run OOP, but audio is extremely choppy
      //   Stop audio when app dies

      //'Cut The Rope',
      // - Doesn't seem to work when non-OOP so didn't test OOP
      // - couldn't test OOP - since wifi wasn't working
      //   Mouse click not delivered
      //   Stop audio when app dies

      'Dev Marketplace',

      //'Dialer',
      // - Dialer doesn't seem to see touches when run OOP - bug 776069

      'E-Mail',
      // - works OOP with Fake account

      'FM Radio',

      'Galactians2',  // Install from Dev Marketplace

      //'Gallery',
      // - When run OOP, doesn't detect any photos or crashes - bug 775591
      // - When run OOP, VolumeService dies - bug 775833

      'Homescreen',
      'Keyboard',

      //'Marketplace',
      // - When run OOP - After trying to Login/Register, never get to persona scren - bug 776086
      // - When run OOP - Sometimes get w->mApp assert (bug 775576)

      //'Messages',
      // - crashes when launched OOP on otoro - bug 775997

      //'Music',
      // - When run OOP, VolumeService dies - bug 775833

      'PenguinPop',

      //'Settings',
      // Most of settings seems to work OOP.
      // However, apprarently bluetooth doesn't - bug 755943

      //'Staging Marketplace',
      // - When run OOP - After trying to Login/Register, never get to persona scren - bug 776086
      // - When run OOP - After trying to Login/Register, got white screen
      // - Works ok when run non-OOP

      //'System',

      'Tasks',
      'Template',
      'Test Agent',
      'TowerJelly',

      //'UI tests',
      // Keyboard always shows up alpha when app using keyboard is run OOP - bug 776118
      // Insert Fake Contacts hangs when run OOP (or not OOP) - bug 776128
      // UI Test - window.open doesn't work properly when run OOP - bug 776129
      // UI Test app - window.close test causes seg fault when run OOP - bug 776132
      // UI Test App - Notifications don't work properly when run OOP - bug 776134

      //'Video',
      // - When run OOP, VolumeService dies - bug 775833
      //   OOP - Assertion failure: w->mApp,
      //         at /home/work/B2G-otoro/gecko/dom/base/nsGlobalWindow.cpp:10697
      //   Stop audio when app dies
    ];
    if (outOfProcessWhitelist.indexOf(name) >= 0) {
      // FIXME: content shouldn't control this directly
      frame.setAttribute('remote', 'true');
      console.info('%%%%% Launching', name, 'as remote (OOP)');
    } else {
      console.info('%%%%% Launching', name, 'as local');
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

    // Launching this application without bring it to the foreground
    if (background) {
      frame.src = url;
      return;
    }

    // Now animate the window opening and actually set the iframe src
    // when that is done.
    setDisplayedApp(origin, function() {
      frame.src = url;

      if (manifest.fullscreen) {
        frame.mozRequestFullScreen();
      }
    });
  }