function() {

            event.preventDefault();

            /**
             * @var $the_form    Object referring to the change password form
             */
            var $the_form = $("#change_password_form");

            if (! PMA_checkPassword($the_form)) {
                return false;
            }

            /**
             * @var this_value  String containing the value of the submit button.
             * Need to append this for the change password form on Server Privileges
             * page to work
             */
            var this_value = $(this).val();

            var $msgbox = PMA_ajaxShowMessage(PMA_messages['strProcessingRequest']);
            $the_form.append('<input type="hidden" name="ajax_request" value="true" />');

            $.post($the_form.attr('action'), $the_form.serialize() + '&change_pw='+ this_value, function(data) {
                if (data.success == true) {
                    $("#floating_menubar").after(data.sql_query);
                    $("#change_password_dialog").hide().remove();
                    $("#edit_user_dialog").dialog("close").remove();
                    $('#change_password_anchor.dialog_active').removeClass('dialog_active').addClass('ajax');
                    PMA_ajaxRemoveMessage($msgbox);
                }
                else {
                    PMA_ajaxShowMessage(data.error, false);
                }
            }); // end $.post()
        }