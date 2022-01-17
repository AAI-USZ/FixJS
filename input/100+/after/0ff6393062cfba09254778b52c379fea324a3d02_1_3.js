function(data) {
            var $div = $('<div id="add_user_dialog"></div>')
            .prepend(data)
            .find("#fieldset_add_user_footer").hide() //showing the "Go" and "Create User" buttons together will confuse the user
            .end()
            .find("form[name=usersForm]").append('<input type="hidden" name="ajax_request" value="true" />')
            .end()
            .dialog({
                title: PMA_messages['strAddUser'],
                width: 800,
                // height is a workaround for this Chrome problem:
                // http://bugs.jqueryui.com/ticket/4671
                // also it's interesting to be able to scroll this window
                height: 600,
                modal: true,
                buttons: button_options,
                close: function () {
                    $(this).remove();
                }
            }); //dialog options end
            displayPasswordGenerateButton();
            PMA_convertFootnotesToTooltips($div);
            PMA_ajaxRemoveMessage($msgbox);
            $div.find("input[autofocus]").focus();

            $div.find('form[name=usersForm]').bind('submit', function (e) {
                e.preventDefault();
                $(this)
                    .closest('.ui-dialog')
                    .find('.ui-dialog-buttonpane .ui-button')
                    .first()
                    .click();
            });
        }