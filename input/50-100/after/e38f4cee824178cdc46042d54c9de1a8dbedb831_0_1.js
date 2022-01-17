function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    var $a = $(this).closest('a');
                    switchStyle($a.attr('data-title'));

                    // poor-man simulation of radio button behaviour
                    $(options.themeSelectionSelector).find('a').removeClass('selected');
                    $a.addClass('selected');
                }