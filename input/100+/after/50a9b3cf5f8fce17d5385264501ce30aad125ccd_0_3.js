function(event){
        event.preventDefault();
        dialogs.remote_form_dialog($(event.target).attr('href'));
    }