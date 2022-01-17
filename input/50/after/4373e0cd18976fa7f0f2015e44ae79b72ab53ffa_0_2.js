function(option){ 
                        html += '<option value="' + option['id'] + '"' ;
                        if (option['id'] === selected_id){
                            html += "selected=selected";
                        }
                        html += '>' + option['name'] + '</option>';
                    }