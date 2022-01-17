function () {
    var sg = new StartLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}