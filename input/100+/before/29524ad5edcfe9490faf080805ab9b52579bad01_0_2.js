function (e) {

            var touchMove = function (e) {
                if(!self.drawReady) return;

                var v = self._touchCapture(e).xy2val(self.dx, self.dy);
                if (v == this.newValue) return;

                if (
                    self.changeHook
                    && (self.changeHook(v) === false)
                ) return;

                self.change(v);
                self.drawReady = false;
            };

            this.touchesIndex = kontrol.Core.getTouchesIndex(e, this.touchesIndex);
            this.change(this._touchCapture(e).xy2val(this.dx,this.dy));
            this._frame(e);

            // Touch events listeners
            kontrol.Core.document
                .bind("touchmove.k", touchMove)
                .bind(
                    "touchend.k"
                    , function (e) {
                        kontrol.Core.document.unbind('touchmove.k touchend.k keyup.k');

                        self.isPressed = false;

                        if (
                            self.releaseHook
                            && (self.releaseHook(self.newValue) === false)
                        ) return;

                        self.val(self.newValue);
                    }
                );

            return this;
        }