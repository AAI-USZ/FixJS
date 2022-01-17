function(){
                    if (!opts.usePlaceholder && $(this).val() == opts.startText && Selections.isEmpty()) {
                        $(this).val("");
                    } else if(input_focus){
                        $("li.as-selection-item", selections_holder).removeClass("blur");
                        if($(this).val() != ""){
                            results_ul.css("width",selections_holder.outerWidth());
                            results_holder.show();
                        }
                    }
                    if (interval) clearInterval(interval);
                    interval = setInterval(function() {
                        if(opts.showResultList){
                            if(opts.selectionLimit && $("li.as-selection-item", selections_holder).length >= opts.selectionLimit){
                                results_ul.html('<li class="as-message">'+opts.limitText+'</li>');
                                results_holder.show();
                            } else {
                                keyChange();
                            }
                        }
                    }, opts.keyDelay);
                    input_focus = true;
                    if (opts.minChars == 0){
                      processRequest($(this).val());
                    }
                    return true;
                }