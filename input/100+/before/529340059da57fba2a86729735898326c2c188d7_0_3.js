function processData(data, query){
                    if (!opts.matchCase){ query = query.toLowerCase(); }
                    query = query.replace("(", "\\(", "g").replace(")", "\\)", "g");
                    var matchCount = 0;
                    results_holder.html(results_ul.html("")).hide();
                    var d_count = countValidItems(data);
                    for(var i=0;i<d_count;i++){
                        var num = i;
                        num_count++;
                        var forward = false;
                        if(opts.searchObjProps == "value") {
                            var str = data[num].value;
                        } else {
                            var str = "";
                            var names = opts.searchObjProps.split(",");
                            for(var y=0;y<names.length;y++){
                                var name = $.trim(names[y]);
                                str = str+data[num][name]+" ";
                            }
                        }
                        if(str){
                            if (!opts.matchCase){ str = str.toLowerCase(); }
                            if(str.search(query) != -1 && values_input.val().search(","+data[num][opts.selectedValuesProp]+",") == -1){
                                forward = true;
                            }
                        }
                        if(forward){
                            var formatted = $('<li class="as-result-item" id="as-result-item-'+num+'"></li>').click(function(){
                                    var raw_data = $(this).data("data");
                                    var number = raw_data.num;
                                    if($("#as-selection-"+number, selections_holder).length <= 0 && !tab_press){
                                        var data = raw_data.attributes;
                                        input.val("").focus();
                                        prev = "";
                                        add_selected_item(data, number);
                                        opts.resultClick.call(this, raw_data);
                                        results_holder.hide();
                                    }
                                    tab_press = false;
                                }).mousedown(function(){ input_focus = false; }).mouseover(function(){
                                    $("li", results_ul).removeClass("active");
                                    $(this).addClass("active");
                                }).data("data",{attributes: data[num], num: num_count});
                            var this_data = $.extend({},data[num]);
                            if (!opts.matchCase){
                                var regx = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + query + ")(?![^<>]*>)(?![^&;]+;)", "gi");
                            } else {
                                var regx = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + query + ")(?![^<>]*>)(?![^&;]+;)", "g");
                            }

                            if(opts.resultsHighlight && query.length > 0){
                                this_data[opts.selectedItemProp] = this_data[opts.selectedItemProp].replace(regx,"<em>$1</em>");
                            }
                            if(!opts.formatList){
                                formatted = formatted.html(this_data[opts.selectedItemProp]);
                            } else {
                                formatted = opts.formatList.call(this, this_data, formatted);
                            }
                            results_ul.append(formatted);
                            delete this_data;
                            matchCount++;
                            if(opts.retrieveLimit && opts.retrieveLimit == matchCount ){ break; }
                        }
                    }
                    selections_holder.removeClass("loading");
                    if(matchCount <= 0){
                        results_ul.html('<li class="as-message">'+opts.emptyText+'</li>');
                    }
                    results_ul.css("width", selections_holder.outerWidth());
                    if (matchCount > 0 || !opts.showResultListWhenNoMatch) {
                        results_holder.show();
                    }
                    opts.resultsComplete.call(this);
                }