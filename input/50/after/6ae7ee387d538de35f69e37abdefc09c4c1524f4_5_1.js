function() {
            $(this).children('span').toggle();
            $('#inserterbar_more_widgets_container', $rootel).toggle();
            resetPosition();
        }