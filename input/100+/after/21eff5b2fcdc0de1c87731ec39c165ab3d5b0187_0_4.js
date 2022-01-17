function(event) {
        event.preventDefault();

        PMA_ajaxShowMessage(PMA_messages['strCopyingDatabase'], false);

        var $form = $(this);

        PMA_prepareForAjaxRequest($form);

        $.get($form.attr('action'), $form.serialize(), function(data) {
            // use messages that stay on screen
            $('div.success, div.error').fadeOut();
            if(data.success == true) {
                PMA_ajaxShowMessage(data.message);
                if( $("#checkbox_switch").is(":checked")) {
                    window.parent.db = data.newname;
                    window.parent.refreshMain();
                    window.parent.refreshNavigation();
               } else {
                    // Here we force a refresh because the navigation
                    // frame url is not changing so this function would
                    // not refresh it
                    window.parent.refreshNavigation(true);
               }
            } else {
                PMA_ajaxShowMessage(data.error, false);
            }
        }) // end $.get
    }