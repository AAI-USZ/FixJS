function() {
            var isFormValid = true;
            var $form = $$(this);
            //Clear all errors
            $$('*[data-fjs-error_for]').html('');
            $form.find(':input').each(function() {
                isFormValid = singleFieldValidate($$(this)) && isFormValid;
            });
            if (isFormValid && $form.attr('data-fjs-form-ajax')) {
                $$.fjs.forms.ajaxSubmit($form);
                return false;
            }
            return isFormValid;
        }