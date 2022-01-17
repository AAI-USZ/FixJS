function (e) {
                var v = self._touchCapture(e).xy2val(self.dx, self.dy);

                if (v == self.newValue) return;

                if (
                    self.changeHook
                    && (self.changeHook(v) === false)
                ) return;


                self.change(v);
                self._draw();
            }