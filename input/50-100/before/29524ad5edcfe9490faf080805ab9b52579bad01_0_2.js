function (e) {
                if(!self.drawReady) return;

                var v = self.xy2val(e.pageX, e.pageY);
                if (v == self.newValue) return;

                if (
                    self.changeHook
                    && (self.changeHook(v) === false)
                ) return;

                self.change(v);
                self.drawReady = false;
            }