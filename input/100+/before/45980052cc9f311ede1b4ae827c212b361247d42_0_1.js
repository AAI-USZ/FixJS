function(language, settings, attachKeyupEvent) {
            if(typeof attachKeyupEvent == 'undefined') {
                attachKeyupEvent = true;
            }

            var $element = $(this);

            var config = {
                    validationRuleAttribute : 'data-validation',
                    validationErrorMsgAttribute : 'data-validation-error-msg', // define custom err msg inline with element
                    errorElementClass : 'error', // Class that will be put on elements which value is invalid
                    borderColorOnError : 'red',
                    dateFormat : 'yyyy-mm-dd'
                    
            };

            if (settings) {
                $.extend(config, settings);
            }
            if (language) {
                $.extend(jQueryFormUtils.LANG, language);
            }
            // get updated dialog strings
            language = jQueryFormUtils.LANG;

            var elementType = $element.attr('type');
            if (jQueryFormUtils.defaultBorderColor === null && elementType !== 'submit' && elementType !== 'checkbox' && elementType !== 'radio') {
                jQueryFormUtils.defaultBorderColor = $element.css('border-color');
            }

            // Remove possible error style applied by previous validation
            $element
                .removeClass(config.errorElementClass)
                .parent()
                    .find('.jquery_form_error_message').remove();
            
            if(config.borderColorOnError !== '') {
                $element.css('border-color', jQueryFormUtils.defaultBorderColor);
            }

            if(!jQueryFormUtils.ignoreInput($element.attr('name'), elementType, config)) {
                var validation = jQueryFormUtils.validateInput($element, language, config);

                if(validation === true) {
                    $element.unbind('keyup');
                } else {
                    $element
                        .addClass(config.errorElementClass)
                        .parent()
                            .append('<span class="jquery_form_error_message">'+validation+'</span>');

                    if(config.borderColorOnError !== '') {
                        $element.css('border-color', config.borderColorOnError);
                    }

                    if(attachKeyupEvent) {
                        $element.bind('keyup', function() {
                            $(this).doValidate(language, settings, false);
                        });
                    }
                }
            }

            return $(this);
        }