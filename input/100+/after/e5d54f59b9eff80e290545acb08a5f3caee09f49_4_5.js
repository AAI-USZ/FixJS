function (start, end, v) {
    var layer = new cc.LayerGradient();
    switch (arguments.length) {
        case 2:
            /** Creates a full-screen CCLayer with a gradient between start and end. */
            if (layer && layer.initWithColor(start, end)) {
                return layer;
            }
            break;
        case 3:
            /** Creates a full-screen CCLayer with a gradient between start and end in the direction of v. */
            if (layer && layer.initWithColor(start, end, v)) {
                return layer;
            }
            break;
        case 0:
            layer.init();
            break;
        default:
            throw "Arguments error ";
            break;
    }
    return null;
}