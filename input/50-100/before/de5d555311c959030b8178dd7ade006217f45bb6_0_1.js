function dragStart(e, dd) {
                            dd.limit = $slideControl.offset();
                            dd.limit.left = ~~dd.limit.left; // ~~ uses bitwise conversion as fast parseInt
                            dd.limit.right = dd.limit.left + calculatedWidth;
                            dd.handle = $slideHandle.offset();
                        }