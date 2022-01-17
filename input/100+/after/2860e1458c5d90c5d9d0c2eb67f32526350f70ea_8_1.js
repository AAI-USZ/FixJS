function (element) {
    if (cc.TouchDispatcher.isRegisterEvent)
        return;

    if (!cc.Browser.isMobile) {
        //register canvas mouse event
        element.addEventListener("mousedown", function (event) {
            var el = element;
            var pos = null;
            if (element instanceof HTMLCanvasElement) {
                pos = {left:0, top:0, height:el.height};
            } else {
                pos = {left:0, top:0, height:parseInt(el.style.height)};
            }
            while (el != null) {
                pos.left += el.offsetLeft;
                pos.top += el.offsetTop;
                el = el.offsetParent;
            }

            var tx = event.pageX;
            var ty = event.pageY;

            var mouseX = (tx - pos.left) / cc.Director.sharedDirector().getContentScaleFactor();
            var mouseY = (pos.height - (ty - pos.top)) / cc.Director.sharedDirector().getContentScaleFactor();

            var touch = new cc.Touch(0, mouseX, mouseY);
            touch._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y);
            cc.TouchDispatcher.preTouchPoint.x = mouseX;
            cc.TouchDispatcher.preTouchPoint.y = mouseY;

            var set = [];
            set.push(touch);
            cc.Director.sharedDirector().getTouchDispatcher().touchesBegan(set, null);
        });

        element.addEventListener("mouseup", function (event) {
            var el = element;
            var pos = null;
            if (element instanceof HTMLCanvasElement) {
                pos = {left:0, top:0, height:el.height};
            } else {
                pos = {left:0, top:0, height:parseInt(el.style.height)};
            }
            while (el != null) {
                pos.left += el.offsetLeft;
                pos.top += el.offsetTop;
                el = el.offsetParent;
            }
            var tx = event.pageX;
            var ty = event.pageY;

            var mouseX = (tx - pos.left) / cc.Director.sharedDirector().getContentScaleFactor();
            var mouseY = (pos.height - (ty - pos.top)) / cc.Director.sharedDirector().getContentScaleFactor();

            var touch = new cc.Touch(0, mouseX, mouseY);
            touch._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y);
            cc.TouchDispatcher.preTouchPoint.x = mouseX;
            cc.TouchDispatcher.preTouchPoint.y = mouseY;

            var set = [];
            set.push(touch);
            cc.Director.sharedDirector().getTouchDispatcher().touchesEnded(set, null);
        });

        element.addEventListener("mousemove", function (event) {
            var el = element;
            var pos = null;
            if (element instanceof HTMLCanvasElement) {
                pos = {left:0, top:0, height:el.height};
            } else {
                pos = {left:0, top:0, height:parseInt(el.style.height)};
            }
            while (el != null) {
                pos.left += el.offsetLeft;
                pos.top += el.offsetTop;
                el = el.offsetParent;
            }
            var tx = event.pageX;
            var ty = event.pageY;

            var mouseX = (tx - pos.left) / cc.Director.sharedDirector().getContentScaleFactor();
            var mouseY = (pos.height - (ty - pos.top)) / cc.Director.sharedDirector().getContentScaleFactor();

            var touch = new cc.Touch(0, mouseX, mouseY);
            touch._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y);
            cc.TouchDispatcher.preTouchPoint.x = mouseX;
            cc.TouchDispatcher.preTouchPoint.y = mouseY;

            var set = [];
            set.push(touch);

            cc.Director.sharedDirector().getTouchDispatcher().touchesMoved(set, null);
        });
    } else {
        //register canvas touch event
        element.addEventListener("touchstart", function (event) {
            if (!event.touches)
                return;

            var set = [];
            var el = element;
            var pos = null;
            if (element instanceof HTMLCanvasElement) {
                pos = {left:0, top:0, height:el.height};
            } else {
                pos = {left:0, top:0, height:parseInt(el.style.height)};
            }
            while (el != null) {
                pos.left += el.offsetLeft;
                pos.top += el.offsetTop;
                el = el.offsetParent;
            }
            pos.left -= document.body.scrollLeft;
            pos.top -= document.body.scrollTop;

            for (var i = 0; i < event.touches.length; i++) {
                var tx = event.touches[i].pageX;
                var ty = event.touches[i].pageY;
                if (event.touches[i]) {
                    tx = event.touches[i].clientX;
                    ty = event.touches[i].clientY;
                }
                var mouseX = (tx - pos.left) / cc.Director.sharedDirector().getContentScaleFactor();
                var mouseY = (pos.height - (ty - pos.top)) / cc.Director.sharedDirector().getContentScaleFactor();

                var touch = new cc.Touch(0, mouseX, mouseY);
                touch._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y);
                cc.TouchDispatcher.preTouchPoint.x = mouseX;
                cc.TouchDispatcher.preTouchPoint.y = mouseY;

                set.push(touch);
            }
            cc.Director.sharedDirector().getTouchDispatcher().touchesBegan(set, null);
            event.stopPropagation();
            event.preventDefault();
        }, false);

        element.addEventListener("touchmove", function (event) {
            if (!event.touches)
                return;

            var set = [];
            var el = element;
            var pos = null;
            if (element instanceof HTMLCanvasElement) {
                pos = {left:0, top:0, height:el.height};
            } else {
                pos = {left:0, top:0, height:parseInt(el.style.height)};
            }
            while (el != null) {
                pos.left += el.offsetLeft;
                pos.top += el.offsetTop;
                el = el.offsetParent;
            }
            pos.left -= document.body.scrollLeft;
            pos.top -= document.body.scrollTop;

            for (var i = 0; i < event.touches.length; i++) {
                var tx = event.touches[i].pageX;
                var ty = event.touches[i].pageY;
                if (event.touches[i]) {
                    tx = event.touches[i].clientX;
                    ty = event.touches[i].clientY;
                }
                var mouseX = (tx - pos.left) / cc.Director.sharedDirector().getContentScaleFactor();
                var mouseY = (pos.height - (ty - pos.top)) / cc.Director.sharedDirector().getContentScaleFactor();

                var touch = new cc.Touch(0, mouseX, mouseY);
                touch._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y);
                cc.TouchDispatcher.preTouchPoint.x = mouseX;
                cc.TouchDispatcher.preTouchPoint.y = mouseY;

                set.push(touch);
            }
            cc.Director.sharedDirector().getTouchDispatcher().touchesMoved(set, null);
            event.stopPropagation();
            event.preventDefault();
        }, false);

        element.addEventListener("touchend", function (event) {
            if (!event.touches)
                return;

            var set = [];
            var el = element;
            var pos = null;
            if (element instanceof HTMLCanvasElement) {
                pos = {left:0, top:0, height:el.height};
            } else {
                pos = {left:0, top:0, height:parseInt(el.style.height)};
            }
            while (el != null) {
                pos.left += el.offsetLeft;
                pos.top += el.offsetTop;
                el = el.offsetParent;
            }
            pos.left -= document.body.scrollLeft;
            pos.top -= document.body.scrollTop;

            var fireTouches = event.touches;
            if (!fireTouches || (fireTouches.length == 0)) {
                fireTouches = event.changedTouches;
            }
            for (var i = 0; i < fireTouches.length; i++) {
                var tx = fireTouches[i].pageX;
                var ty = fireTouches[i].pageY;
                if (fireTouches[i]) {
                    tx = fireTouches[i].clientX;
                    ty = fireTouches[i].clientY;
                }

                var mouseX = (tx - pos.left) / cc.Director.sharedDirector().getContentScaleFactor();
                var mouseY = (pos.height - (ty - pos.top)) / cc.Director.sharedDirector().getContentScaleFactor();

                var touch = new cc.Touch(0, mouseX, mouseY);
                touch._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y);
                cc.TouchDispatcher.preTouchPoint.x = mouseX;
                cc.TouchDispatcher.preTouchPoint.y = mouseY;

                set.push(touch);
            }
            cc.Director.sharedDirector().getTouchDispatcher().touchesEnded(set, null);
            event.stopPropagation();
            event.preventDefault();
        }, false);

        element.addEventListener("touchcancel", function (event) {
            if (!event.touches)
                return;

            var set = [];
            var el = element;
            var pos = null;
            if (element instanceof HTMLCanvasElement) {
                pos = {left:0, top:0, height:el.height};
            } else {
                pos = {left:0, top:0, height:parseInt(el.style.height)};
            }
            while (el != null) {
                pos.left += el.offsetLeft;
                pos.top += el.offsetTop;
                el = el.offsetParent;
            }
            pos.left -= document.body.scrollLeft;
            pos.top -= document.body.scrollTop;

            for (var i = 0; i < event.touches.length; i++) {
                var tx = event.touches[i].pageX;
                var ty = event.touches[i].pageY;
                if (event.touches[i]) {
                    tx = event.touches[i].clientX;
                    ty = event.touches[i].clientY;
                }
                var mouseX = (tx - pos.left) / cc.Director.sharedDirector().getContentScaleFactor();
                var mouseY = (pos.height - (ty - pos.top)) / cc.Director.sharedDirector().getContentScaleFactor();

                var touch = new cc.Touch(0, mouseX, mouseY);
                touch._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y);
                cc.TouchDispatcher.preTouchPoint.x = mouseX;
                cc.TouchDispatcher.preTouchPoint.y = mouseY;

                set.push(touch);
            }
            cc.Director.sharedDirector().getTouchDispatcher().touchesCancelled(set, null);
            event.stopPropagation();
            event.preventDefault();
        }, false);
    }

    cc.TouchDispatcher.isRegisterEvent = true;
}