function(){
                            Selections.remove(data[opts.selectedValuesProp]);
                            opts.selectionRemoved.call(this, item);
                            input_focus = true;
                            input.focus();
                            return false;
                        }