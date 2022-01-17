function (label, dimensions, alignment, fontName, fontSize) {
    var ret = new cc.LabelTTF();
    if (arguments.length > 3) {
        if ((ret != null) && (ret.initWithString(label, dimensions, alignment, fontName, fontSize))) {
            return ret;
        }
        return null;
    } else {
        fontName = arguments[1];
        fontSize = arguments[2];
        if ((ret != null) && (ret.initWithString(label, fontName, fontSize))) {
            return ret;
        }

        return null;
    }
}