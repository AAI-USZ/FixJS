function(){
                    if (!opts.usePlaceholder && $(this).val() == "" && Selections.isEmpty() && prefill_value == "" && opts.minChars > 0) {
                        $(this).val(opts.startText);
                    } else if(input_focus){
                        $("li.as-selection-item", selections_holder).addClass("blur").removeClass("selected");
                        results_holder.hide();
                    }
                    if (interval) clearInterval(interval);
                }