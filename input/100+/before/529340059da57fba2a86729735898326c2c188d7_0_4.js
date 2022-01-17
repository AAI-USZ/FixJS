function add_selected_item(data, num){
                    values_input.val((values_input.val()||",")+data[opts.selectedValuesProp]+",");
                    var item = $('<li class="as-selection-item" id="as-selection-'+num+'" data-value="' + data[opts.selectedValuesProp] + '"></li>').click(function(){
                            opts.selectionClick.call(this, $(this));
                            selections_holder.children().removeClass("selected");
                            $(this).addClass("selected");
                        }).mousedown(function(){ input_focus = false; });
                    var close = $('<a class="as-close">&times;</a>').click(function(){
                            values_input.val(values_input.val().replace(","+data[opts.selectedValuesProp]+",",","));
                            opts.selectionRemoved.call(this, item);
                            input_focus = true;
                            input.focus();
                            return false;
                        });
                    org_li.before(item.html(data[opts.selectedItemProp]).prepend(close));
                    opts.selectionAdded.call(this, org_li.prev(), data[opts.selectedValuesProp]);
                    return org_li.prev();
                }