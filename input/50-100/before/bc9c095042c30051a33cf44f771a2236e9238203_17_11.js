function(index, item){
                        var firstChar = $.trim($(item).text()).toLowerCase().substr(0, 1);
                        if (keyPressed === firstChar && index > activeIndex){
                            $(item).find("a").focus();
                            itemFound = true;
                            return false;
                        }
                    }