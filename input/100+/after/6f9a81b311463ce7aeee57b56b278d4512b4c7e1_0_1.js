function(e) {
                var $focusElement = $(this);
                var $lastElt = $('.topnavigation_right').children().last();
                if (e.which === $.ui.keyCode.DOWN && $focusElement.hasClass('hassubnav')) {
                    $focusElement.find('div a:first').focus();
                    return false; // prevent browser page from scrolling down
                } else if (e.which === $.ui.keyCode.LEFT || (e.which === $.ui.keyCode.TAB && e.shiftKey) && !$focusElement.parent().is($lastElt)) {
                    closeMenu();
                    closePopover();
                    if ($focusElement.parents('.topnavigation_counts_container').length) {
                        $focusElement = $focusElement.parents('.topnavigation_counts_container');
                    }
                    if ($focusElement.prev('.topnavigation_counts_container').length) {
                        $focusElement.prev('.topnavigation_counts_container').children('button').focus();
                        return false;
                    } else if ($focusElement.prev('li:first').length) {
                        $focusElement.prev('li:first').children('a').focus();
                        return false;
                    } else if (!(e.which === $.ui.keyCode.TAB && e.shiftKey)) {
                        $focusElement.nextAll('li:last').children('a').focus();
                        return false;
                    }
                } else if ((e.which === $.ui.keyCode.RIGHT || e.which === $.ui.keyCode.TAB) && !$focusElement.parent().is($lastElt)) {
                    closeMenu();
                    closePopover();
                    if ($focusElement.parents('.topnavigation_counts_container').length) {
                        $focusElement = $focusElement.parents('.topnavigation_counts_container');
                    }
                    if ($focusElement.next('.topnavigation_counts_container').length) {
                        $focusElement.next('.topnavigation_counts_container').children('button').focus();
                    } else if ($focusElement.next('li:first').length) {
                        $focusElement.next('li:first').children('a').focus();
                    } else if ($focusElement.prevAll('li:last').length && e.which === $.ui.keyCode.RIGHT) {
                        $focusElement.prevAll('li:last').children('a').focus();
                    } else {
                        $('#topnavigation_search_input').focus();
                    }
                    return false;
                } else if ($focusElement.hasClass('hassubnav') && $focusElement.children('a').is(':focus')) {
                    // if a letter was pressed, search for the first menu item that starts with the letter
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