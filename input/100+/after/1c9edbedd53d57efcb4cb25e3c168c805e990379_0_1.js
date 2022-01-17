function(data) {
      let aViewport = data.json;
      dump("####################### VIEWPORT " + JSON.stringify(aViewport));

      asyncPanZoom.screenWidth = aViewport.screenSize.width;
      asyncPanZoom.screenHeight = aViewport.screenSize.height;

      // Transform coordinates based on zoom
      let x = aViewport.x / aViewport.zoom;
      let y = aViewport.y / aViewport.zoom;

      let win = content;
      let cwu = win.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowUtils);
      cwu.setCSSViewport(asyncPanZoom.screenWidth, asyncPanZoom.screenHeight);

      // Set scroll position
      cwu.setScrollPositionClampingScrollPortSize(
          asyncPanZoom.screenWidth / aViewport.zoom, asyncPanZoom.screenHeight / aViewport.zoom);
      win.scrollTo(x, y);
      asyncPanZoom.userScrollPos = { x: win.scrollX, y: win.scrollY };
      asyncPanZoom.setResolution(aViewport.zoom, false);

      if (aViewport.displayPort)
        asyncPanZoom.setDisplayPort(aViewport.displayPort);
    }