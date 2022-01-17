function(request) {
    if (request.type != "request") {
      return;
    }
    var self = Tapedeck.Frontend.Messenger;

    var response = self.newResponse(request);
    self.log("Receving request: " + request.action);

    switch(request.action)
    {
      case "executeScriptInTest":
        var script = request.script;
        var scriptFile = script.replace("frontend/scripts/", "");
        scriptFile = scriptFile.replace(".js", "");

        var words = scriptFile.split("-");
        var scriptName = "";
        for (var i = 0; i < words.length; i++) {
          scriptName += words[i].charAt(0).toUpperCase() +
                        words[i].slice(1);
        }

        self.log("Executing script in test: " + scriptName);
        if (typeof(request.params) != "undefined") {
          window.parent.TapedeckInjected[scriptName].start(request.params);
        }
        else {
          window.parent.TapedeckInjected[scriptName].start();
        }
        break;

      case "pushView":
        Tapedeck.Frontend.Frame.replaceView(request.view,
                                            request.proxyEvents);
        break;

      case "showModal":
        var wrappedCallback = function(params) {
          response.params = params;
          self.sendMessage(response);
        };
        var cleanupCallback = function() {
          response.error = true;
          self.sendMessage(response);
        };

        Tapedeck.Frontend.Frame.Modal.show(request.view,
                                           request.proxyEvents,
                                           wrappedCallback,
                                           cleanupCallback);
        break;

      case "loadComplete":
        Tapedeck.Frontend.Frame.onLoadComplete();
        break;

      case "updateSeekSlider":
        Tapedeck.Frontend.Frame.Player.SeekSlider.updateSlider
                                                 (request.currentTime,
                                                  request.duration);
        break;
      case "updateVolumeSlider":
        Tapedeck.Frontend.Frame.Player.VolumeSlider.updateSlider
                                                   (request.volume);
        break;

      default:
        throw new Error("Messenger's handleRequest was sent an unknown action '" + request.action + "'");
    }
  }