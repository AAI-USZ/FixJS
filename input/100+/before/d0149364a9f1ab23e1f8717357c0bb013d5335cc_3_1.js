function(options) {
        var self = this;
        this.audioEl = options.audioEl = document.getElementById("background-audio");
        this.nowPlayingCollection = options.nowPlayingCollection = new NowPlayingCollection();
        this.pollFsm = new NowPlayingPollFsm(backgroundApp.audioEl, backgroundApp.nowPlayingCollection);

        window.chrome.extension.onConnect.addListener(function(port) {
          if (port.name == "kexp.app.view") {
            self.pollFsm.attachView();
            port.onDisconnect.addListener(function() {
              self.pollFsm.detachView();
              _gaq.push(["_trackEvent", "Application", "Close"]);
            });
          }
        });
      }