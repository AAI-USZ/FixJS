function (item, newPosition) {
                    fluid.clear(movedMap); // if we somehow were fooled into missing a defocus, at least clear the map on a 2nd move
                    var movingId = fluid.allocateSimpleId(item);
                    movedMap[movingId] = {
                        oldRender: that.renderLabel(item)
                    };
                }