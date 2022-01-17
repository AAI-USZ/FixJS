function(event, ui) {
                    var sourceParent, targetParent, targetIndex, i, targetUnwrapped, arg,
                        el = ui.item[0],
                        item = ko.utils.domData.get(el, ITEMKEY);

                    if (item) {
                        //identify parents
                        sourceParent = ko.utils.domData.get(el, PARENTKEY);
                        targetParent = ko.utils.domData.get(el.parentNode, LISTKEY);
                        targetIndex = ko.utils.arrayIndexOf(ui.item.parent().children(), el);

                        //take destroyed items into consideration
                        if (!templateOptions.includeDestroyed) {
                            targetUnwrapped = targetParent();
                            for (i = 0; i < targetIndex; i++) {
                                //add one for every destroyed item we find before the targetIndex in the target array
                                if (targetUnwrapped[i] && targetUnwrapped[i]._destroy) {
                                    targetIndex++;
                                }
                            }
                        }

                        if (sortable.beforeMove || sortable.afterMove) {
                            arg = {
                                item: item,
                                sourceParent: sourceParent,
                                sourceParentNode: el.parentNode,
                                sourceIndex: sourceParent.indexOf(item),
                                targetParent: targetParent,
                                targetIndex: targetIndex,
                                cancelDrop: false
                            };
                        }

                        if (sortable.beforeMove) {
                            sortable.beforeMove.call(this, arg, event, ui);
                            if (arg.cancelDrop) {
                                $(arg.sourceParent === arg.targetParent ? this : ui.sender).sortable('cancel');
                                return;
                            }
                        }

                        if (targetIndex >= 0) {
                            sourceParent.remove(item);
                            targetParent.splice(targetIndex, 0, item);
                        }

                        //rendering is handled by manipulating the observableArray; ignore dropped element
                        ko.utils.domData.set(el, ITEMKEY, null);
                        ui.item.remove();

                        //allow binding to accept a function to execute after moving the item
                        if (sortable.afterMove) {
                           sortable.afterMove.call(this, arg, event, ui);
                        }
                    }

                    if (updateActual) {
                        updateActual.apply(this, arguments);
                    }
                }