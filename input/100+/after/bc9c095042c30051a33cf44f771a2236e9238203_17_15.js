function(e) {
                if (e.which === $.ui.keyCode.DOWN) {
                    if ($(this).parent().nextAll('li:first').length) {
                        $(this).parent().nextAll('li:first').children('a').focus();
                    } else {
                        $(this).parent().prevAll('li:last').children('a').focus();
                    }
                    return false; // prevent browser page from scrolling down
                } else if (e.which === $.ui.keyCode.UP) {
                    if ($(this).parent().prevAll('li:first').length) {
                        $(this).parent().prevAll('li:first').children('a').focus();
                    } else {
                        $(this).parent().nextAll('li:last').children('a').focus();
                    }
                    return false;
                } else if (e.which === $.ui.keyCode.ESCAPE) {
                    $(this).parent().parents('li:first').find('a:first').focus();
                } else {
                    // if a letter was pressed, search for the next menu item that starts with the letter
                    var keyPressed = String.fromCharCode(e.which).toLowerCase();
                    var $activeItem = $(this).parents('li:first');
                    var $menuItems = $(this).parents('ul:first').children();
                    var activeIndex = $menuItems.index($activeItem);
                    var itemFound = false;
                    $menuItems.each(function(index, item) {
                        var firstChar = $.trim($(item).text()).toLowerCase().substr(0, 1);
                        if (keyPressed === firstChar && index > activeIndex) {
                            $(item).find('a').focus();
                            itemFound = true;
                            return false;
                        }
                    });
                    if (!itemFound) {
                        $menuItems.each(function(index, item) {
                            var firstChar = $.trim($(item).text()).toLowerCase().substr(0, 1);
                            if (keyPressed === firstChar) {
                                $(item).find('a').focus();
                                return false;
                            }
                        });
                    }
                }
            }