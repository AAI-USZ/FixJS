function(requestedOptions, callback) {
    var tMgr = Tapedeck.Backend.TemplateManager;
    var fillMap = {
      "currentCassette" : tMgr.getCurrentCassette,
      "currentPage" : tMgr.getCurrentPage,
      "cassetteList" : tMgr.getCassettes,
      "browseList" : tMgr.getBrowseList,
      "queue" : tMgr.getQueue,
      "playlistList" : tMgr.getPlaylistList,
      "playerState" : tMgr.getPlayerState,
      "currentTrack" : tMgr.getCurrentTrack,
      "tabID" : tMgr.getTabID,
    };
    tMgr.log("Filling options: " + JSON.stringify(requestedOptions), tMgr.DEBUG_LEVELS.ALL);

    var options = {};
    var optionCount = Object.keys(requestedOptions).length;
    var filledCount = 0;
    for (var optionName in requestedOptions) {
      if (optionName in fillMap) {

        // attempt to the fill the requested option
        var paramName = requestedOptions[optionName];
        var fillFn = fillMap[optionName];

        var scoped = function(param, filler) {

          // call the filler
          filler(function(filling) {
            options[param] = filling;
            filledCount = filledCount + 1;
            if (filledCount >= optionCount) {
              callback(options);
            }
          }, function(error) {
            // failed to fill
            optionCount = optionCount - 1;
            options[param] = "error";
            console.error("Fill map error on param '" + param + "': "+ JSON.stringify(error));
            if (filledCount >= optionCount) {
              callback(options);
            }
          });

        }(paramName, fillFn); // end scoped

      }
      else {
        console.error(optionName + " not in the fillMap");
      }
    }
  }