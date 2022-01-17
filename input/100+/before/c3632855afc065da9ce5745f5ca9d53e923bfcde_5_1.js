function (to, reverse, callback) {
        var fromPage = this,
            toPage = (typeof to == 'object') ? to : $(to),
            parent = fromPage.parent(),
            parentWidth = parent.width(),
            onComplete, translateX;
            
        if (parent.is(toPage.parent())) {
            if (reverse) {
                parent.css('-webkit-transform', 'translate3d(' + (-1*parentWidth) + 'px, 0, 0)');
                fromPage.css('-webkit-transform', 'translate3d(' + parentWidth + 'px, 0, 0)');
                translateX = 0;
            } else {
                toPage.css('-webkit-transform', 'translate3d(' + parentWidth + 'px, 0, 0)');
                translateX = -1*parentWidth;
            }
            
            onComplete = function() {
                fromPage.css('visibility', 'hidden').css('-webkit-transform', 'translate3d(0, 0, 0)');
                parent.css('-webkit-transform', 'translate3d(0, 0, 0)');
                toPage.css('-webkit-transform', 'translate3d(0, 0, 0)');
                if (typeof callback == 'function') callback();
            }
            
            toPage.css('visibility', 'visible');
            parent.slide('translate3d(' + translateX + 'px, 0, 0)', onComplete);
        }
    }