function() {
        var hash = window.location.hash;
        hash = hash.charAt(0) == '#' ? hash.substring(1, hash.length) : hash;
        if (hash != '') {
            SelectPiece(hash);
            if (selectedFeature != null) {
                olmap.zoomToExtent(selectedFeature.geometry.getBounds());
                olmap.zoomOut();
            }
        }
        else if (!olmap.getCenter()) {
            olmap.zoomToExtent(kmllayer.getDataExtent());
            olmap.zoomOut(); // a bit smaller
        }
        updateAllPieceStyles();
    }