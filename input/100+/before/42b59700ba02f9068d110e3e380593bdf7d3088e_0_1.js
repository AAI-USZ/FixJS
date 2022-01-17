function(data) {
      dump("************MESSAGE " + data.json.toSource());
      let aViewport = data.json;

      asyncPanZoom.screenWidth = aViewport.screenSize.width;
      asyncPanZoom.screenHeight = aViewport.screenSize.height;

      // Transform coordinates based on zoom
      let x = aViewport.x / aViewport.zoom;
      let y = aViewport.y / aViewport.zoom;

      // Set scroll position
      let win = content;
      win.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowUtils).setScrollPositionClampingScrollPortSize(
          asyncPanZoom.screenWidth / aViewport.zoom, asyncPanZoom.screenHeight / aViewport.zoom);
      win.scrollTo(x, y);
      asyncPanZoom.userScrollPos = { x: win.scrollX, y: win.scrollY };
      asyncPanZoom.setResolution(aViewport.zoom, false);

      if (aViewport.displayPort)
        asyncPanZoom.setDisplayPort(aViewport.displayPort);
    }