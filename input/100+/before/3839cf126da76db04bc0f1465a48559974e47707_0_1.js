function(ev, ui) {
                    // make sure the popup fits in the window
                    if (dlg.height() > window.innerHeight*0.8) {
                        dlg.height(window.innerHeight*0.8);
                    }
                    if (dlg.width() > window.innerWidth*0.8) {
                        dlg.width(window.innerWidth*0.8);
                    }
                    // and is not off the edge of the window
                    var off  = dlg.offset(),
                        top  = off.top,
                        left = off.left;
                    if (top < 0) {
                        top = 0;
                    }
                    else if (top + dlg.outerHeight() > window.innerHeight) {
                        top = window.innerHeight - dlg.outerHeight();
                    }
                    if (left < 0) {
                        left = 0;
                    }
                    else if (left + dlg.outerWidth() > window.innerWidth) {
                        left = window.innerWidth - dlg.outerWidth();
                    }
                    if (top !== off.top || left !== off.left) {
                        dlg.dialog({ position: [top, left] });
                    }
                }