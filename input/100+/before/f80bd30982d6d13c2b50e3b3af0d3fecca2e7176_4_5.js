function (start, end, v) {
    var argnum = arguments.length;
    var layer = new cc.LayerGradient();
    switch (argnum) {
        case 2:
            /** Creates a full-screen CCLayer with a gradient between start and end. */
            if (layer && layer.initWithColor(start, end)) {
                return layer;
            }
            return null;
            break;
        case 3:
            /** Creates a full-screen CCLayer with a gradient between start and end in the direction of v. */
            if (layer && layer.initWithColor(start, end, v)) {
                return layer;
            }
            return null;
            break;
        case 0:
            layer.init();
            break;
        default:
            throw "Arguments error ";
            break;
    }
}