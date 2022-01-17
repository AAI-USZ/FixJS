function() {

            /**
             * @var $form    stores reference to current form
             */
            var $form = $(this).find("form[name=usersForm]").last();

            if (! checkAddUser($form.get(0))) {
                return false;
            }

            //We also need to post the value of the submit button in order to get this to work correctly
            $.post($form.attr('action'), $form.serialize() + "&adduser_submit=" + $(this).find("input[name=adduser_submit]").val(), function(data) {
                if (data.success == true) {
                    // Refresh navigation, if we created a database with the name
                    // that is the same as the username of the new user
                    if ($('#add_user_dialog #createdb_1:checked').length && window.parent) {
                        window.parent.refreshNavigation(true);
                    }

                    $("#add_user_dialog").dialog("close");
                    PMA_ajaxShowMessage(data.message);
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
                    if ($('#fieldset_add_user a.ajax').attr('name') == 'db_specific') {

                        /*process the fieldset_add_user attribute and get the val of privileges*/
                        var url = $('#fieldset_add_user a.ajax').attr('rel');

                        if (url.substring(url.length - 23, url.length) == "&goto=db_operations.php") {
                            url = url.substring(0, url.length - 23);
                        }
                        url = url + "&ajax_request=true&db_specific=true";

                        /* post request for get the updated userForm table */
                        $.post($form.attr('action'), url, function(priv_data) {

                            /*Remove the old userForm table*/
                            if ($('#userFormDiv').length != 0) {
                                $('#userFormDiv').remove();
                            } else {
                                $("#usersForm").remove();
                            }
                            var $user_div = $('<div id="userFormDiv"></div>');
                            /*If the JSON string parsed correctly*/
                            if (typeof priv_data.success != 'undefined') {
                                if (priv_data.success == true) {
                                    $user_div
                                     .html(priv_data.user_form)
                                     .insertAfter('#result_query');
                                } else {
                                    PMA_ajaxShowMessage(PMA_messages['strErrorProcessingRequest'] + " : " + priv_data.error, false);
                                }
                            } else {
                                /*parse the JSON string*/
                                var obj = $.parseJSON(priv_data);
                                $user_div
                                 .html(obj.user_form)
                                 .insertAfter('#result_query');
                            }
                        });
                    } else {
                        appendNewUser(data.new_user_string, data.new_user_initial, data.new_user_initial_string);
                    }
                } else {
                    PMA_ajaxShowMessage(PMA_messages['strErrorProcessingRequest'] + " : " + data.error, false);
                }
            });
        }