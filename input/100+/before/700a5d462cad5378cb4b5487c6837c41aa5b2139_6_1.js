function(key, value){
                            if ($.isPlainObject(value) && value.id){
                                templates.push(value);
                            }
                        }