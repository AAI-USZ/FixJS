function (overlays) {
    var ret = 0;
    overlays.forEach(function (overlay, index, orig) {
        overlay.setVisible(false);
        ret++;
    });
    return ret;
}