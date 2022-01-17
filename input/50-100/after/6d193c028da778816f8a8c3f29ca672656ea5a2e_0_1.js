function() {
            var $textarea = $("textarea", this);
            var options = [];

            $.extend(true, options, $.parseJSON($(this).attr('data-textarea-options')), $.parseJSON($(this).attr('data-richtext-options')));

            $textarea.depageEditor(options);
        }