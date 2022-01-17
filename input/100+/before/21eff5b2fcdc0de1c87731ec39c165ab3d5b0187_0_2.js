function(url) {
            PMA_ajaxShowMessage(PMA_messages['strRenamingDatabases']);

            $.get(url, $("#rename_db_form").serialize() + '&is_js_confirmed=1', function(data) {
                if(data.success == true) {

                    PMA_ajaxShowMessage(data.message);

                    window.parent.db = data.newname;

                    $("#floating_menubar")
                    .next('div')
                    .remove()
                    .end()
                    .after(data.sql_query);

                    //Remove the empty notice div generated due to a NULL query passed to PMA_getMessage()
                    var $notice_class = $("#floating_menubar").next("div").find('.notice');
                    if ($notice_class.text() == '') {
                        $notice_class.remove();
                    }

                    $("<span>" + PMA_messages['strReloadDatabase'] + "?</span>").dialog({
                        buttons: button_options
                    }) //end dialog options
                } else {
                    PMA_ajaxShowMessage(data.error, false);
                }
            }) // end $.get()
        }