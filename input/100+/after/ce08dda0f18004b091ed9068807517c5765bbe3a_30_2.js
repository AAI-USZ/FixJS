function (normalSprite, selectedSprite, three, four, five) {
    var len = arguments.length;
    var normalSprite = arguments[0], selectedSprite = arguments[1], disabledImage, target, callback;
    var ret = new cc.MenuItemSprite();
    //when you send 4 arguments, five is undefined
    if (len == 5) {
        disabledImage = arguments[2], target = arguments[3], callback = arguments[4]
    }
    else if (len == 4) {
        target = arguments[2], callback = arguments[3];
    }
    else if (len <= 3) {
        disabledImage = arguments[2];
    }
    ret.initWithNormalSprite(normalSprite, selectedSprite, disabledImage, target, callback);
    return ret;
}