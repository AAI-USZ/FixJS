function selectPieceFromURL() {
    var hash = window.location.hash;
    hash = hash.charAt(0) == '#' ? hash.substring(1, hash.length) : hash;
    if (hash === '') {
        return;
    }

    SelectPiece(hash);
    if (selectedFeature !== null) {
        olmap.zoomToExtent(selectedFeature.geometry.getBounds());
        olmap.zoomOut();
    }
}