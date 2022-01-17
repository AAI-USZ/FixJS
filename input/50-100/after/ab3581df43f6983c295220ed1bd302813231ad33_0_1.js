function(options, selected_id){
                    var html = "";

                    selector.empty();
                    KT.utils.each(options, function(option){ 
                        html += '<option value="' + option['id'] + '"' ;
                        if (option['id'] === selected_id){
                            html += "selected=selected";
                        }
                        html += '>' + option['name'] + '</option>';
                    });

                    selector.append(html);
                    selector.chosen();
                }