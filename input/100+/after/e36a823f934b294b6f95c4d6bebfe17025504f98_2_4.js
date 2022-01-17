function (selectable) {
                        var labelOptions = {};
                        var id = fluid.allocateSimpleId(selectable);
                        var moved = movedMap[id];
                        var label = that.renderLabel(selectable);
                        var plainLabel = label;
                        if (moved) {
                            moved.newRender = plainLabel;
                            label = that.renderLabel(selectable, moved.oldRender.position);
                            // once we move focus out of the element which just moved, return its ARIA label to be the new plain label
                            $(selectable).one("focusout.ariaLabeller", function () {
                                if (movedMap[id]) {
                                    var oldLabel = movedMap[id].newRender.label;
                                    delete movedMap[id];
                                    fluid.updateAriaLabel(selectable, oldLabel);
                                }
                            });
                            labelOptions.dynamicLabel = true;
                        }
                        fluid.updateAriaLabel(selectable, label.label, labelOptions);
                    }