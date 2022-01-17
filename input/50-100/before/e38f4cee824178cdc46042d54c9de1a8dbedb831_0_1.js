function() {
                    var $a = $(this).closest('a');
                    switchStyle($a.attr('data-title'));

                    // poor-man simulation of radio button behaviour
                    setTimeout(function() {
                        $a.addClass('active');
                    }, 0);
                }