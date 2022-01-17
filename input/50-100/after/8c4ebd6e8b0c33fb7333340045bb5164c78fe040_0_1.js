function(url, options) {
              if (options === null || options === "undefined") {
                  options = {};
                  options.showLocationBar = true;
              }
              cordova.exec(this._onEvent, this._onError, "ChildBrowser", "showWebPage", [url, options]);
          }