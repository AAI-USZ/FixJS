function(event) {
        /** @lends jQuery */
        event.preventDefault();

        var $t = $(this);

        if ($t.is('.copyUserForm') && ! PMA_checkPassword($t)) {
            return false;
        }

        PMA_ajaxShowMessage(PMA_messages['strProcessingRequest']);

        $t.append('<input type="hidden" name="ajax_request" value="true" />');

        /**
         * @var curr_submit_name    name of the current button being submitted
         */
        var curr_submit_name = $t.find('.tblFooters').find('input:submit').attr('name');

        /**
         * @var curr_submit_value    value of the current button being submitted
         */
        var curr_submit_value = $t.find('.tblFooters').find('input:submit').val();

        $.post($t.attr('action'), $t.serialize() + '&' + curr_submit_name + '=' + curr_submit_value, function(data) {
            if(data.success == true) {

                PMA_ajaxShowMessage(data.message);

                //Close the jQueryUI dialog
                $("#edit_user_dialog").dialog("close");

                if(data.sql_query) {
                    $("#floating_menubar")
                    .next('div')
                    .remove()
                    .end()
                    .after(data.sql_query);
                    var $notice_class = $("#floating_menubar").next("div").find('.notice');
                    if($notice_class.text() == '') {
                        $notice_class.remove();
                    }
                } //Show SQL Query that was executed

                //Append new user if necessary
                if(data.new_user_string) {
                    appendNewUser(data.new_user_string, data.new_user_initial, data.new_user_initial_string);
                }

                //Check if we are on the page of the db-specific privileges
                var db_priv_page = !!($('#dbspecificuserrights').length); // the "!!" part is merely there to ensure a value of type boolean
                // we always need to reload on the db-specific privilege page
                // and on the global page when adjusting global privileges,
                // but not on the global page when adjusting db-specific privileges.
                var reload_privs = false;
                if (data.db_specific_privs == false || (db_priv_page == data.db_specific_privs)) {
                    reload_privs = true;
                }

                //Change privileges, if they were edited and need to be reloaded
                if(data.new_privileges && reload_privs) {
                    $("#usersForm")
                    .find('.current_row')
                    .find('code')
                    .html(data.new_privileges);
                }

                $("#usersForm")
                .find('.current_row')
                .removeClass('current_row');
            }
            else {
                PMA_ajaxShowMessage(data.error, false);
            }
        });
    }