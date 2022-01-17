function (e) {
                            e.preventDefault();
                            
                            var ori = e.originalEvent
                                ,deltaX = ori.detail || ori.wheelDeltaX
                                ,deltaY = ori.detail || ori.wheelDeltaY
                                ,v = parseInt(self.target.val()) + (deltaX>0 || deltaY>0 ? 1 : deltaX<0 || deltaY<0 ? -1 : 0);
                            
                            if (
                                self.changeHook
                                && (self.changeHook(v) === false)
                            ) return;

                            self.val(v);
                        }