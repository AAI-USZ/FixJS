function (item, newPosition) {
                    fluid.clear(movedMap); // if we somehow were fooled into missing a defocus, at least clear the map on a 2nd move
                    // This unbind is needed for FLUID-4693 with Chrome 18, which generates a focusOut when
                    // simply doing the DOM manipulation to move the element to a new position.   
                    $(item).unbind("focusout.ariaLabeller");
                    var movingId = fluid.allocateSimpleId(item);
                    movedMap[movingId] = {
                        oldRender: that.renderLabel(item)
                    };
                }