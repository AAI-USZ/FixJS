function($input) {
        //Getting CSS params
        var errorClass = $input.attr('data-fjs-error_class');
        if (errorClass) {
            $input.removeClass(errorClass);
            //Gently removing error class from related objects
            $$('*[data-fjs-highlight_error_for*="'+$input.attr('name')+'"]').each(function() {
                var currAttr = $$(this).attr('data-fjs-highlight_error_for');
                //If only one field specified - just remove class
                if (currAttr == $input.attr('name')) {
                    $$(this).removeClass(errorClass);
                    return;
                }
                //Go over the fields and check if other have same error class
                //and it is actually set
                var relatedFields = currAttr.split(',');
                var needClassRemove = true;
                for (var i=0,c=relatedFields.length; i<c; i++) {
                    if (relatedFields[i] == $input.attr('name'))
                        continue;
                    if ($$('*[name="'+relatedFields[i]+'"]').hasClass(errorClass)) {
                        needClassRemove = false;
                        break;
                    }
                }
                if (needClassRemove)
                    $$(this).removeClass(errorClass);
            });
        }
        //Clear error
        $$('*[data-fjs-error_for="'+$input.attr('name')+'"]').html('');
        //If validation failed
        if ($$.fjs.validate.fieldError($input)) {
            //Highlight error
            var error = $$.fjs.validate.fieldError($input);
            var errorText = $$.fjs.hasPlugin('lang') ? $$_(error) : error;
            $$('*[data-fjs-error_for="'+$input.attr('name')+'"]').html(errorText).attr('data-fjs-localizable', error);
            if (errorClass) {
                $input.addClass(errorClass);
                $$('*[data-fjs-highlight_error_for*="'+$input.attr('name')+'"]').addClass(errorClass);
            }
        }
        return this;
    }