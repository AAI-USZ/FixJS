function(index, item){
                        var firstChar = $.trim($(item).text()).toLowerCase().substr(0, 1);
                        if (key === firstChar){
                            $(item).find("a").focus();
                            return false;
                        }
                    }