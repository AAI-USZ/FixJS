function wait() {
    // Tell the browser bot to run a bunch of functions used to eg determine if the page
    // has reloaded yet.
    try {
      if (builder.selenium1.playback.stopRequest) {
        window.clearInterval(interval);
        builder.selenium1.playback.record_result({failed:true, failureMessage: "Test stopped"});
        return;
      }
      // The browser bot is trying to listen for new windows being opened so it can wrap their
      // open, alert, etc functions. Unfortunately, it actually gets ahold of objects that have
      // some of the properties of the windows it wants, but are not the real thing, as wrapping
      // their functions doesn't work - the actual window objects that end up getting used by the
      // Javascript on the loaded page have non-wrapped functions.
      // So we lend a helping hand by asking Firefox (note that this makes the code Firefox
      // specific) for all the windows in the browser and pass them to browserbot to have them
      // processed.
      var windowManager = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService(Components.interfaces.nsIWindowMediator);
      var en = windowManager.getEnumerator(null, false);
      while (en.hasMoreElements()) {
        var w = en.getNext();
        for (i = 0; i < w.frames.length; i++) {
          // This expression filters out the frames that aren't browser tabs.
          // I'm sure there's a better way to detect this, but this would require meaningful
          // documentation in Firefox! qqDPS
          if ((w.frames[i] + "").indexOf("ChromeWindow") === -1) {
            var win = w.frames[i];
            builder.selenium1.playback.browserbot._modifyWindow(win);
            // FF 4 has rearchitected so that we can no longer successfully intercept open()
            // calls on windows. So instead, we manually look for new windows that have opened.
            // But doing so actually breaks under FF 3, so only do this on FF 4.
            // qqDPS TODO Use a nicer way to check for browser version.
            if (navigator.userAgent.indexOf("Firefox/4") !== -1 && !win.__selenium_builder_popup_listener_active) {
              win.__selenium_builder_popup_listener_active = true;
              win.addEventListener("load", makeLoadListener(win, builder.selenium1.playback.browserbot), false);
            }
          }
        }
      }
      
      builder.selenium1.playback.browserbot.runScheduledPollers();
      if (result.terminationCondition && !result.terminationCondition()) { return; }
      window.clearInterval(interval);
      builder.selenium1.playback.record_result(result);
    } catch (e) {
      window.clearInterval(interval);
      builder.selenium1.playback.record_error(e);
    }
  }