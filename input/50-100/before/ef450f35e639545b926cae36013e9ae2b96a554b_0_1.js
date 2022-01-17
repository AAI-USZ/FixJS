function (e) {
                        kontrol.Core.document.unbind('touchmove.k touchend.k keyup.k');

                        self.isPressed = false;

                        if (
                            self.releaseHook
                            && (self.releaseHook(self.newValue) === false)
                        ) return;

                        self.val(self.newValue);
                    }