function (e) {
                                        e.preventDefault();
                                        var ori = e.originalEvent
                                            ,deltaX = ori.detail || ori.wheelDeltaX
                                            ,deltaY = ori.detail || ori.wheelDeltaY
                                            ,val = parseInt($this.val()) + (deltaX>0 || deltaY>0 ? 1 : deltaX<0 || deltaY<0 ? -1 : 0);
                                        k.val(val);
                                    }