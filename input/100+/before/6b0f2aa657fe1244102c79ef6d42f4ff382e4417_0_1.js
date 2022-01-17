function animShow (direction) {

            var Viewport = oo.view.Viewport, vp = oo.getViewport();

            direction = direction || Viewport.ANIM_RTL;

            var anim_duration = 0;
            if (direction !== Viewport.NO_ANIM) {
                // prepare transition
                //vp.getWidth(false, true) :
                //Warning : avoid the cached dom value cause bug in android navigator when orientationchange is fired
                var translateDist = vp.getWidth(false, true) * (direction == Viewport.ANIM_RTL ? 1 : -1);
                this.setTranslateX(translateDist);
                anim_duration = Viewport.ANIM_DURATION;
            }

            this.setDisplay('block', '');

            var _this = this;
            this.translateTo({x:0}, anim_duration);
        }