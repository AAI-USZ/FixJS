function (view, delay) {
    var shake1 = Ti.UI.createAnimation({
        transform: Ti.UI.create2DMatrix().translate(5, 0),
        duration: 100
    });
    var shake2 = Ti.UI.createAnimation({
        transform: Ti.UI.create2DMatrix().translate(-5, 0),
        duration: 100
    });
    var shake3 = Ti.UI.createAnimation({
        transform: Ti.UI.create2DMatrix().translate(5, 0),
        duration: 100
    });
    var shake4 = Ti.UI.createAnimation({
        transform: Ti.UI.create2DMatrix().translate(-5, 0),
        duration: 100
    });
    var shake5 = Ti.UI.createAnimation({
        transform: Ti.UI.create2DMatrix(),
        duration: 100
    });
    if (delay) {
        setTimeout(function () {
            exports.chainAnimate(view, [ shake1, shake2, shake3, shake4, shake5 ]);
            view = shake1 = shake2 = shake3 = shake4 = shake5 = null;
        }, delay);
    }
    else {
        exports.chainAnimate(view, [ shake1, shake2, shake3, shake4, shake5 ]);
    }
}