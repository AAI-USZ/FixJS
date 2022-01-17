function(url, options) {
              if (options === null || options === "undefined") {
                  var options = new Object();
                  options.showLocationBar = true;
              }
              cordova.exec(this._onEvent, this._onError, "ChildBrowser", "showWebPage", [url, options]);
          }