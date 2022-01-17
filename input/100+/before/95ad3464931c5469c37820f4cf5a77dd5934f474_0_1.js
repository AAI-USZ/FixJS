function(language, settings) {

            /*
             * Config
             */
            var config = {
                ignore : [], // Names of inputs not to be validated even though node attribute containing the validation rules tells us to
                errorElementClass : 'error', // Class that will be put on elements which value is invalid
                borderColorOnError : 'red', // Border color of elements which value is invalid, empty string to not change border color
                errorMessageClass : 'jquery_form_error_message', // class name of div containing error messages when validation fails
                validationRuleAttribute : 'data-validation', // name of the attribute holding the validation rules
                validationErrorMsgAttribute : 'data-validation-error-msg', // define custom err msg inline with element
                errorMessagePosition : 'top', // Can be either "top" or "element"
                scrollToTopOnError : true,
                dateFormat : 'yyyy-mm-dd'
            };
            
            /*
             * Extends initial settings
             */
            if (settings) {
                $.extend(config, settings);
            }
            if (language) {
                $.extend(jQueryFormUtils.LANG, language);
            } 
	        // get updated dialog strings
            language = jQueryFormUtils.LANG;

            /**
             * Tells whether or not to validate element with this name and of this type
             *
             * @param {String} name
             * @param {String} type
             * @param {Object} config
             * @return {Boolean}
             */
            var ignoreInput = function(name, type, config) {
                if (type === 'submit' || type === 'button') {
                    return true;
                }

                for (var i = 0; i < config.ignore.length; i++) {
                    if (config.ignore[i] === name) {
                        return true;
                    }
                }
                return false;
            };

            /**
             * Adds message to error message stack if not already in the message stack
             *
             * @param {String} mess
             */
            var addErrorMessage = function(mess) {
                if (jQuery.inArray(mess, errorMessages) < 0) {
                    errorMessages.push(mess);
                }
            };

            /** Error messages for this validation */
            var errorMessages = [];

            /** Input elements which value was not valid */
            var errorInputs = [];

            /** Form instance */
            var $form = $(this);

            //
            // Validate element values
            //
            $form.find('input,textarea,select').each(function() {

                var $el = $(this);
                var elementType = $el.attr('type');
                if (!jQueryFormUtils.ignoreInput($el.attr('name'), elementType, config)) {

                    // input of type radio
                    if(elementType === 'radio') {
                        var validationRule = $el.attr(config.validationRuleAttribute);
                        if (typeof validationRule != 'undefined' && validationRule === 'required') {
                            var radioButtonName = $el.attr('name');
                            var isChecked = false;
                            $form.find('input[name=' + radioButtonName + ']').each(function() {
                                if ($(this).is(':checked')) {
                                    isChecked = true;
                                    return false;
                                }
                            });
                            if (!isChecked && $.inArray(radioButtonName, config.ignore) == -1) {
                                errorMessages.push(language.requiredFields);
                                errorInputs.push($el);
                                $(this).attr('data-error', language.requiredFields);
                            }
                        }
                    }
                    // inputs, textareas and select lists
                    else {

                        // memorize border color
                        if (jQueryFormUtils.defaultBorderColor === null && elementType) {
                            jQueryFormUtils.defaultBorderColor = $.trim($el.css('border-color'));
                        }

                        var valid = jQueryFormUtils.validateInput(
                                                        $el,
                                                        language,
                                                        config,
                                                        $form
                                                    );

                        if(valid !== true) {
                            errorInputs.push($el);
                            $el.attr('data-error', valid);
                            addErrorMessage(valid);
                        }
                    }
                }
            });

            //
            // Reset style and remove error class
            //
           // if(jQueryFormUtils.defaultBorderColor == config.borderColorOnError)
             //   jQueryFormUtils.defaultBorderColor = 'inherit';

            var borderStyleProp = jQueryFormUtils.defaultBorderColor===null ||
                                    (jQueryFormUtils.defaultBorderColor.indexOf(' ') > -1 && jQueryFormUtils.defaultBorderColor.indexOf('rgb') == -1)
                                    ? 'border':'border-color';

            $form.find('input,textarea,select')
                    .css(borderStyleProp, jQueryFormUtils.defaultBorderColor)
                    .removeClass(config.errorElementClass);

            //
            // Remove possible error messages from last validation
            //
            $('.' + config.errorMessageClass.split(' ').join('.')).remove();
            $('.jquery_form_error_message').remove();


            //
            // Validation failed
            //
            if (errorInputs.length > 0) {

                // Apply error style to invalid inputs
                for (var i = 0; i < errorInputs.length; i++) {
                    if (config.borderColorOnError !== '') {
                        errorInputs[i].css('border-color', config.borderColorOnError);
                    }
                    errorInputs[i].addClass(config.errorElementClass);
                }

                // display all error messages in top of form
                if (config.errorMessagePosition === 'top') {
                    var messages = '<strong>' + language.errorTitle + '</strong>';
                    for (var i = 0; i < errorMessages.length; i++) {
                        messages += '<br />* ' + errorMessages[i];
                    }

                    $form.children().eq(0).before('<p class="' + config.errorMessageClass + '">' + messages + '</p>');
                    if(config.scrollToTopOnError) {
                        $(window).scrollTop($form.offset().top - 20);
                    }
                }

                // Display error message below input field
                else {
                    for (var i = 0; i < errorInputs.length; i++) {
                        var parent = errorInputs[i].parent();
                        var errorSpan = parent.find('span[class=jquery_form_error_message]');
                        if (errorSpan.length > 0) {
                            errorSpan.eq(0).text(errorInputs[i].attr('data-error'));
                        } else {
                            parent.append('<span class="jquery_form_error_message">' + errorInputs[i].attr('data-error') + '</span>');
                        }
                    }
                }
                return false;
            }
            
            return true;
        }