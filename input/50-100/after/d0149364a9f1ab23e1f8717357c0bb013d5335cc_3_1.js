function(port) {
        if (port.name == "kexp.app.view") {
          self.pollFsm.attachView();
          port.onDisconnect.addListener(function() {
            self.pollFsm.detachView();
          });
        }
      }