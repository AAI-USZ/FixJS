function(){
                            values_input.val(values_input.val().replace(","+data[opts.selectedValuesProp]+",",","));
                            opts.selectionRemoved.call(this, item);
                            input_focus = true;
                            input.focus();
                            return false;
                        }