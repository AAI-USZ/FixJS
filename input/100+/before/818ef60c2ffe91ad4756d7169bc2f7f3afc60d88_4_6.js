function findRelay() {
      var loc = window.location;
      var frames = window.opener.frames;
      var origin = loc.protocol + '//' + loc.host;
      for (i = frames.length - 1; i >= 0; i++) {
        try {
          if (frames[i].location.href.indexOf(origin) === 0 &&
              frames[i].name === RELAY_FRAME_NAME)
          {
            return frames[i];
          }
        } catch(e) { }
      }
      return;
    }