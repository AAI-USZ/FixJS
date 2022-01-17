function(view, delay) {
    var flash1 = Ti.UI.createAnimation({
        opacity: .7,
        duration: 100
    }), flash2 = Ti.UI.createAnimation({
        opacity: 1,
        duration: 100
    }), flash3 = Ti.UI.createAnimation({
        opacity: .7,
        duration: 100
    }), flash4 = Ti.UI.createAnimation({
        opacity: 1,
        duration: 100
    });
    delay ? setTimeout(function() {
        exports.chainAnimate(view, [ flash1, flash2, flash3, flash4 ]), view = flash1 = flash2 = flash3 = flash4 = null;
    }, delay) : exports.chainAnimate(view, [ flash1, flash2, flash3, flash4 ]);
}