function(commentHtml, form) {
            var form_data = form.data();

            if('' != form_data.parent) {
                var form_parent = form.parent();

                // reply button holder
                var reply_button_holder = form_parent.parent();
                reply_button_holder.removeClass('fos_comment_replying');

                reply_button_holder.after(commentHtml);

                // Remove the form
                form_parent.remove();
            } else {
                // Insert the comment
                form.after(commentHtml);

                // "reset" the form
                form = $(form[0]);
                form.children('textarea')[0].value = '';
                form.children('.fos_comment_form_errors').remove();
            }
        }