function(e) {
    console.log('mozChromeEvent received: ' + e.detail.type);

    var origin = e.detail.origin;
    if (!origin)
      return;

    var app = Applications.getByOrigin(origin);
    var name = app.manifest.name;


    // Check if it's a virtual app from a entry point.
    // If so, change the app name and origin to the
    // entry point.
    var entryPoints = app.manifest.entry_points;
    if (entryPoints) {
      for (var ep in entryPoints) {
        //Remove the origin and / to find if if the url is the entry point
        var path = e.detail.url.substr(e.detail.origin.length + 1);
        if (path.indexOf(ep) == 0 &&
            (ep + entryPoints[ep].launch_path) == path) {
          origin = origin + '/' + ep;
          name = entryPoints[ep].name;
        }
      }
    }

    switch (e.detail.type) {
      // mozApps API is asking us to launch the app
      // We will launch it in foreground
      case 'webapps-launch':
        if (isRunning(origin)) {
          setDisplayedApp(origin, null, e.detail.url);
          return;
        }

        appendFrame(origin, e.detail.url,
                    name, app.manifest, app.manifestURL);
        break;

      // System Message Handler API is asking us to open the specific URL
      // that handles the pending system message.
      // We will launch it in background if it's not handling an activity.
      case 'open-app':
        if (isRunning(origin)) {
          var frame = getAppFrame(origin);
          // If the app is in foreground, it's too risky to change it's
          // URL. We'll ignore this request.
          if (displayedApp === origin)
            return;

          // If the app is opened and it is loaded to the correct page,
          // then there is nothing to do.
          if (frame.src !== e.detail.url) {
            // Rewrite the URL of the app frame to the requested URL.
            // XXX: We could ended opening URls not for the app frame
            // in the app frame. But we don't care.
            frame.src = e.detail.url;
          }
        } else {
          if (!app)
            return;

          // XXX: We could ended opening URls not for the app frame
          // in the app frame. But we don't care.
          appendFrame(origin, e.detail.url,
                      app.manifest.name, app.manifest, app.manifestURL, true);
        }

        setDisplayedApp(origin);
        break;
    }
  }