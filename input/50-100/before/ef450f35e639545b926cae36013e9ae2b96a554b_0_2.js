function (e) {

                        self.isPressed = false;

                        kontrol.Core.document.unbind('mousemove.k mouseup.k keyup.k');

                        if (
                            self.releaseHook
                            && (self.releaseHook(self.newValue) === false)
                        ) return;

                        self.val(self.newValue);
                    }