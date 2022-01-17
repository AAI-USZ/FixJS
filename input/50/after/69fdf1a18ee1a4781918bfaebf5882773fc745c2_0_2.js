function(e, dd) {
                            setPosition(
                                methods.confinePositionToLimit(
                                    dd.handle.left + dd.deltaX - $sliderControl.offset().left,
                                    dd.limit
                                )
                            );
                        }