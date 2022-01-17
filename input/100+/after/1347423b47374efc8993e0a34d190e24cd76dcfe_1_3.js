function() {
        olmap.zoomToExtent(kmllayer.getDataExtent());
        olmap.zoomOut(); // a bit smaller
        updateAllPieceStyles();
    }