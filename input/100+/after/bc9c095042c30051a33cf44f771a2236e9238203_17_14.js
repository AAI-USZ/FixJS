function(e) {
                var $focusElement = $(this);
                if (e.which === $.ui.keyCode.DOWN && $focusElement.hasClass('hassubnav')) {
                    $focusElement.find('div a:first').focus();
                    return false; // prevent browser page from scrolling down
                } else if (e.which === $.ui.keyCode.TAB && e.shiftKey) {
                    closeMenu();
                } else if ($focusElement.hasClass('hassubnav') && $focusElement.children('a').is(':focus')) {
                    // if a letter was pressed, search for the first menu item that starts with the letterletter
                    var key = String.fromCharCode(e.which).toLowerCase();
                    $focusElement.find('ul:first').children().each(function(index, item) {
                        var firstChar = $.trim($(item).text()).toLowerCase().substr(0, 1);
                        if (key === firstChar) {
                            $(item).find('a').focus();
                            return false;
                        }
                    });
                }
            }