function(data) {
            $('<div id="change_password_dialog"></div>')
            .dialog({
                title: PMA_messages['strChangePassword'],
                width: 600,
                close: function(ev, ui) {
                    $(this).remove();
                },
                buttons : button_options,
                beforeClose: function(ev, ui) {
                    $('#change_password_anchor.dialog_active').removeClass('dialog_active').addClass('ajax');
                }
            })
            .append(data);
            // for this dialog, we remove the fieldset wrapping due to double headings
            $("fieldset#fieldset_change_password")
            .find("legend").remove().end()
            .find("table.noclick").unwrap().addClass("some-margin")
            .find("input#text_pma_pw").focus();
            displayPasswordGenerateButton();
            $('#fieldset_change_password_footer').hide();
            PMA_ajaxRemoveMessage($msgbox);
        }