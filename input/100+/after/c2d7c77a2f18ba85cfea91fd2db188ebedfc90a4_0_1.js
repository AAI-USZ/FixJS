function tryLoadingTypekit() {
      try {
        Typekit.load({
          active: function() { onLoad("Typekit active"); },
          inactive: function() { onLoad("Typekit inactive"); }
        });
      } catch(e) { onLoad("ERROR: " + e); }
    }