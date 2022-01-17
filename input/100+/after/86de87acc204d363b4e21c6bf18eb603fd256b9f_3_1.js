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
      // w->mApp Assertion
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=775576
      // Gallery App crash (in IndexedDB)
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=775591
      // Electrolysize b2g-bluetooth
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=755943
      // VolumeService doesn't work when called OOP
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=775833

      'Calculator',
      'Calendar',

      //=== Test === ICS ===
      //'Camera',
      //   Cross-process camera control
      //   Cross-process preview stream

      //'Clock',
      //  - OOP - asserts on w->mApp (bug 775576)

      'Contacts',

      //'CrystalSkull',
      // - Doesn't crash when run OOP
      //   WebGL texture sharing (for full perf)

      //'CubeVid',
      // - Doesn't crash when run OOP, but audio is extremely choppy
      //   Stop audio when app dies
      //   WebGL texture sharing (for full perf)

      //=== Test ===
      //'Cut The Rope',
      // - Doesn't seem to work when non-OOP so didn't test OOP
      // - couldn't test OOP - since wifi wasn't working
      //   Mouse click not delivered
      //   Stop audio when app dies

      'Dev Marketplace',

      //=== Test ===
      //'Dialer',
      //   Crashes when launching

      'E-Mail',
      // - works OOP with Fake account

      'FM Radio',

      'Galactians2',  // Install from Dev Marketplace

      //'Gallery',
      // - When run OOP, doesn't detect any photos or crashes (bug 775591)
      // - When run OOP, VolumeService dies - bug 775833

      'Homescreen',
      'Keyboard',

      //'Marketplace',
      // - When run OOP - After trying to Login/Register, got white screen
      // - When run OOP - Sometimes get w->mApp assert (bug 775576)
      //   Cross-process IME
      //   Cross-process mozApps

      //=== Test ===
      //'Messages',
      //   - crashes when launched OOP on otoro

      //'Music',
      // - When run OOP, VolumeService dies - bug 775833

      'PenguinPop',

      //'Settings',
      // Most of settings seems to work OOP.
      // However, apprarently bluetooth doesn't - 755943

      //=== Test ===
      //'Staging Marketplace',
      // - When run OOP - After trying to Login/Register, got white screen
      // - Works ok when run non-OOP

      //'System',

      'Tasks',
      'Template',
      'Test Agent',
      'TowerJelly'

      //'UI tests',
      // some stuff works, some doesn't when OOP

      //=== Test === ICS ===
      //'Video',
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