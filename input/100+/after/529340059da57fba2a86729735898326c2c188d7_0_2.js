function(e) {
                    // track last key pressed
                    lastKeyPressCode = e.keyCode;
                    first_focus = false;
                    switch(e.keyCode) {
                        case 38: // up
                            e.preventDefault();
                            moveSelection("up");
                            break;
                        case 40: // down
                            e.preventDefault();
                            moveSelection("down");
                            break;
                        case 8:  // delete
                            if(input.val() == ""){
                                var last = Selections.getAll();
                                if (last.length > 0) {
                                    last = last[last.length - 1];
                                } else {
                                    last = null;
                                }
                                selections_holder.children().not(org_li.prev()).removeClass("selected");
                                if(org_li.prev().hasClass("selected")){
                                    Selections.remove(last);
                                    opts.selectionRemoved.call(this, org_li.prev());
                                } else {
                                    opts.selectionClick.call(this, org_li.prev());
                                    org_li.prev().addClass("selected");
                                }
                            }
                            if(input.val().length == 1){
                                results_holder.hide();
                                prev = "";
                                abortRequest();
                            }
                            if($(":visible",results_holder).length > 0){
                                if (timeout){ clearTimeout(timeout); }
                                timeout = setTimeout(function(){ keyChange(); }, opts.keyDelay);
                            }
                            break;
                        case 9: case 188:  // tab or comm
                            if(opts.canGenerateNewSelections){
                                tab_press = true;
                                var i_input = input.val().replace(/(,)/g, "");
                                var active = $("li.active:first", results_holder);
                                // Generate a new bubble with text when no suggestion selected
                                if (i_input !== "" && !Selections.exist(i_input) && i_input.length >= opts.minChars && active.length === 0) {
                                    e.preventDefault();
                                    var n_data = {};
                                    n_data[opts.selectedItemProp] = i_input;
                                    n_data[opts.selectedValuesProp] = i_input;
                                    var lis = $("li", selections_holder).length;
                                    add_selected_item(n_data, "00"+(lis+1));
                                    input.val("");
                                    // Cancel previous request when new tag is added
                                    abortRequest();
                                    break;
                                }
                            }
                        case 13: // return
                            tab_press = false;
                            var active = $("li.active:first", results_holder);
                            if(active.length > 0){
                                active.click();
                                results_holder.hide();
                            }
                            if(opts.neverSubmit || active.length > 0){
                                e.preventDefault();
                            }
                            break;
                        // ignore if the following keys are pressed: [escape] [shift] [capslock]
                        case 27: // escape
                            // Prevent event bubbling when pressing escape (e.g. when used in dialogs).
                            if (opts.preventPropagationOnEscape && $(':visible', results_holder).length > 0) {
                                e.stopPropagation();
                            }
                        case 16: // shift
                        case 20: // capslock
                            abortRequest();
                            results_holder.hide();
                            break;
                    }
                }