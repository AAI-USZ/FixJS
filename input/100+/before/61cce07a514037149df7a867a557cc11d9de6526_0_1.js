function () {

      if (!this.shownGraph.get("info")){
        this.shownGraph.set({
          info: {}
        });
      }
      while (!this.shownGraph.get("info").hasOwnProperty("url") || this.shownGraph.get("info")["url"]==="") {
        var keysuggestion;
        if (this.shownGraph.get("info").hasOwnProperty("title") && this.shownGraph.get("info")["title"]!=="") {
          keysuggestion = this.shownGraph.get("info")["title"];
        } else {
          keysuggestion = "app-" + new Date().getTime();
        }
        this.setKey(keysuggestion);
      }
      var currentAppGraph = JSON.parse(JSON.stringify(this.shownGraph));
      var key = currentAppGraph["info"]["url"];
      var app;
      if (this._loadedLocalApp) {
        if (this._localApps.getByUrl(key) && this._localApps.getByUrl(key) !== this._loadedLocalApp) {
          if (window.confirm("\""+key+"\" already exists as a local app. Do you want to replace it?")) {
            app = this._localApps.updateOrCreate(currentAppGraph);
          } else {
            return false;
          }
        } else {
          // New name
          app = this._loadedLocalApp;
          app.save({graph:currentAppGraph});
          app.trigger("change");
        }
      } else {
        // Overwrite?
        if (this._localApps.getByUrl(key) && !window.confirm("\""+key+"\" already exists as a local app. Do you want to replace it?")) {
          return false;
        }
        app = this._localApps.updateOrCreate(currentAppGraph);
      }

      this._loadedLocalApp = app;

      // URL hash
      Iframework.router.navigate("local/"+key);
      return app;
    }