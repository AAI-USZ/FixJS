function($input) {
            //Clear error
            $$('*[data-fjs-error_for="'+$input.attr('name')+'"]').html('');
            //If validation failed
            if (!$$.fjs.validate.field($input)) {
                //Highlight error
                var error = $$.fjs.validate.fieldError($input);
                var errorText = $$.fjs.hasPlugin('lang') ? $$_(error) : error;
                $$('*[data-fjs-error_for="'+$input.attr('name')+'"]').html(errorText).attr('data-fjs-localizable', error);
                return false;
            }
            return true;
        }