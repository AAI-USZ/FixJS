function(e, dd) {
                            setPosition(
                                methods.confinePositionToLimit(dd.handle.left + dd.deltaX, dd.limit)
                            );
                        }