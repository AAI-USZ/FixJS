function button_click () {
        $(".map-menuitem.selected", komooMap.addMenu).removeClass("selected");
        $(".frozen", komooMap.mainPanel).removeClass("frozen");
        komooMap.drawingManager.setDrawingMode(null);
        panel.hide();
    }