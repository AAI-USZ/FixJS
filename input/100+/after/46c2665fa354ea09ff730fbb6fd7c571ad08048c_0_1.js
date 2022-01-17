function (view) {
    if (!require('data/settings').allowAnimations()) {
        view.transform = Ti.UI.create2DMatrix();
        view.opacity = 1;
        return;
    }

    var animate1 = Ti.UI.createAnimation({
        opacity: 1,
        transform: Ti.UI.create2DMatrix().scale(1.05, 1.05),
        duration: 200
    });
    var animate2 = Ti.UI.createAnimation({
        transform: Ti.UI.create2DMatrix(),
        duration: 300
    });

    exports.chainAnimate(view, [ animate1, animate2 ]);
    view = null;
}