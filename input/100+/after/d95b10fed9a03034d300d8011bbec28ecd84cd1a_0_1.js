function(data) {
      let aViewport = data.json;

      asyncPanZoom.screenWidth = aViewport.screenSize.width;
      asyncPanZoom.screenHeight = aViewport.screenSize.height;

      let x = aViewport.x;
      let y = aViewport.y;

      let win = content;
      let cwu = win.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowUtils);
      cwu.setCSSViewport(asyncPanZoom.screenWidth, asyncPanZoom.screenHeight);

      // Set scroll position
      cwu.setScrollPositionClampingScrollPortSize(
          asyncPanZoom.screenWidth / aViewport.zoom, asyncPanZoom.screenHeight / aViewport.zoom);
      win.scrollTo(x, y);
      asyncPanZoom.userScrollPos = { x: win.scrollX, y: win.scrollY };
      asyncPanZoom.setResolution(aViewport.zoom, false);

      asyncPanZoom.setDisplayPort(aViewport.displayPort);
    }