function(options){
                    var html = "";

                    selector.empty();

                    KT.utils.each(options, function(option){ 
                        html += '<option value="' + option['id'] + '">' + option['name'] + '</option>';
                    });

                    selector.append(html);
                }