function (e) {
                if(!self.drawReady) return;

                var v = self._touchCapture(e).xy2val(self.dx, self.dy);
                if (v == this.newValue) return;

                if (
                    self.changeHook
                    && (self.changeHook(v) === false)
                ) return;

                self.change(v);
                self.drawReady = false;
            }