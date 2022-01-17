function() {
            $(this).children('span').toggle();
            $('#inserterbar_more_widgets_container', $rootel).animate({
                opacity: 'toggle',
                height: 'toggle'
            });
            editPosition();
        }