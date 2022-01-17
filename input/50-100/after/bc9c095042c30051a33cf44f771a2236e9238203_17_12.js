function(index, item) {
                            var firstChar = $.trim($(item).text()).toLowerCase().substr(0, 1);
                            if (keyPressed === firstChar) {
                                $(item).find('a').focus();
                                return false;
                            }
                        }