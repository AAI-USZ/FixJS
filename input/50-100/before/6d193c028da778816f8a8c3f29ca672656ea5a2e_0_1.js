function() {
            var options = $.parseJSON($(this).attr('data-textarea-options')) || $.parseJSON($(this).attr('data-richtext-options'));
            var $textarea = $("textarea", this);

            $textarea.depageEditor(options);
        }