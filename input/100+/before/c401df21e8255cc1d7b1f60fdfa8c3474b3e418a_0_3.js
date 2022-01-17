function(event) {
        event.preventDefault();

        var $msgbox = PMA_ajaxShowMessage(PMA_messages['strCopyingDatabase']);

        var $form = $(this);
        
        PMA_prepareForAjaxRequest($form);

        $.get($form.attr('action'), $form.serialize(), function(data) {
            // use messages that stay on screen
            $('.success').fadeOut();
            $('.error').fadeOut();
            if(data.success == true) {
                $('#floating_menubar').after(data.message);
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
            }
            else {
                $('#floating_menubar').after(data.error);
            }
            
            PMA_ajaxRemoveMessage($msgbox);
        }) // end $.get
    }