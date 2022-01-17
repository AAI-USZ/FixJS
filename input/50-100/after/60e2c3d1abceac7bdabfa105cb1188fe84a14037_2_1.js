function(attributes) {
      User.__super__.initialize.call(this, attributes);
      
      // If there is no prefs, create a new one
      if (!this.get("prefs")) {
        this.set("prefs", new UserPreference());
      }
      
      // If there is no permissions, create a new one
      if (!this.get("permissions")) {
        this.set("permissions", new Permission());
      }
      
      // If there is no hotkeys, create a new one
      if (!this.get("hotkeys")) {
        this.set("hotkeys", new HotKey());
      }
    }