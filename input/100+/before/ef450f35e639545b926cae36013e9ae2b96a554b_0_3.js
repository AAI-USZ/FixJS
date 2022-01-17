function (e) {

            var mouseMove = function (e) {
                var v = self.xy2val(e.pageX, e.pageY);
                if (v == self.newValue) return;

                if (
                    self.changeHook
                    && (self.changeHook(v) === false)
                ) return;

                self.change(v);
                self._draw();
            };

            this.change(this.xy2val(e.pageX, e.pageY));
            
            //this._frame(e);
            this._draw();

            // Mouse events listeners
            kontrol.Core.document
                .bind("mousemove.k", mouseMove)
                .bind(
                    // Escape key cancel current change
                    "keyup.k"
                    , function (e) {
                        if (e.keyCode === 27) {
                            kontrol.Core.document.unbind("mouseup.k mousemove.k keyup.k");

                            if (
                                self.cancelHook
                                && (self.cancelHook() === false)
                            ) return;

                            self.cancel();
                        }
                    }
                )
                .bind(
                    "mouseup.k"
                    , function (e) {

                        self.isPressed = false;

                        kontrol.Core.document.unbind('mousemove.k mouseup.k keyup.k');

                        if (
                            self.releaseHook
                            && (self.releaseHook(self.newValue) === false)
                        ) return;

                        self.val(self.newValue);
                    }
                );

            return this;
        }