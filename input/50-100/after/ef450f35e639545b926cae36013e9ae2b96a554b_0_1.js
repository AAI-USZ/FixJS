function (e) {
                        //self.isPressed = false;
                        kontrol.Core.document.unbind('touchmove.k touchend.k');

                        if (
                            self.releaseHook
                            && (self.releaseHook(self.newValue) === false)
                        ) return;

                        self.val(self.newValue);
                    }