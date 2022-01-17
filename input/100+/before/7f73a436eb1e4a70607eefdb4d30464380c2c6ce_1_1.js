function (event) {
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
        }