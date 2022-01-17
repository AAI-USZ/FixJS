function(xhr, st, str) {
            var dialog_buttons={};
            dialog_buttons[okBtn]=function(){
                $( this ).dialog( "close" );
            };
            $("<p><strong>" + str + " (Error " + xhr.status + ")</strong><br/> Could not process your query.</p>").dialog({
                modal: true,
                title: error,
                buttons: dialog_buttons,
                resizable: false
            });
        }