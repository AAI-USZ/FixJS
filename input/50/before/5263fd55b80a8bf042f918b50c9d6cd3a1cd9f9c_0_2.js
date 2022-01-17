function (overlays) {
    var ret = 0;
    overlays.forEach(function (overlay, index, orig) {
        overlay.setVisible(true);
        ret++;
    });
    return ret;
}