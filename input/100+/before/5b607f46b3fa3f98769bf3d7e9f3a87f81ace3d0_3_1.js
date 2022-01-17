function() {
                $(dialogHeaderClass, $sendmessage_container).show();
                $sendmessage_container.addClass(dialogContainerClass);
                $(dialogBoxContainer).addClass(dialogBoxClass);
                $(".sendmessage_dialog_footer_inner").addClass(dialogFooterInner);
                $(messageDialogContainer).addClass(dialogClass.replace(/\./,''));
                $(messageDialogContainer).show();
                $(sendmessage_to).show();
                $(sendmessage_subject).show();
                $(sendmessage_body).find("label").show();
                // Clear the input fields
                $(messageFieldSubject + ", " + messageFieldBody).val('');

                // remove autoSuggest if it exists
                sakai.api.Util.AutoSuggest.destroy($("#sendmessage_to_autoSuggest"));
            }