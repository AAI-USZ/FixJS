function (event) {
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
        }