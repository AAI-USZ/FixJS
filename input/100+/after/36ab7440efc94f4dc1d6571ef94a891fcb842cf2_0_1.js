function(k,v) {
      // if the feature has no social attribute, then no use...
      if(this.attributes()["social"] && this.attributes()["social"] != undefined) {
          if ( v != undefined ) {
              // setting
              if (this.get("social") && this.getPath("social.status")!=SC.Record.ERROR) {
                  /*
                   * Here we try to prevent busy erros when the user interacts too quickly with the app, or the
                   * backend is too slow in responding.
                   * For the time being we simply drop the mid-flight update.
                   */
                  if(this.getPath("social.status") & SC.Record.READY)
                      this.get("social").set("starred", v);
              } else {
                  var social = Maps.store.createRecord(
                    Maps.Social,
                        { guid: this.attributes()["social"],
                            starred: v,
                            x: this.attributes()["x"],
                            y: this.attributes()["y"]
                        });
                  this.set("social", social);
              }
          } else {
              // getting
              var starred = this.getPath("social.starred");
              return starred ? YES : NO;
          }
      }
  }