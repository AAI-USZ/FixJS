function()
    {
      // MapContainer
      var layout = new qx.ui.mobile.layout.VBox().set({
        alignX : "center",
        alignY : "middle"
      });
      
      var mapContainer = new qx.ui.mobile.container.Composite(layout);
      
      mapContainer.setId("osmMap");
      return mapContainer;
    }