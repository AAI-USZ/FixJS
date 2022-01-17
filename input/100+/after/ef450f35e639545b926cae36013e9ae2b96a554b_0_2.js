function (e) {

            var touchMove = function (e) {
                var v = self._touchCapture(e).xy2val(self.dx, self.dy);
                if (v == this.newValue) return;

                if (
                    self.changeHook
                    && (self.changeHook(v) === false)
                ) return;

                self.change(v);
                self._draw();
            };

            this.touchesIndex = kontrol.Core.getTouchesIndex(e, this.touchesIndex);

            // First touch
            touchMove(e);

            // Touch events listeners
            kontrol.Core.document
                .bind("touchmove.k", touchMove)
                .bind(
                    "touchend.k"
                    , function (e) {
                        //self.isPressed = false;
                        kontrol.Core.document.unbind('touchmove.k touchend.k');

                        if (
                            self.releaseHook
                            && (self.releaseHook(self.newValue) === false)
                        ) return;

                        self.val(self.newValue);
                    }
                );

            return this;
        }