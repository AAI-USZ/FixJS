function() {
                    var options = {
                        onclick: false,
                        onkeyup: false,
                        onfocusout: false
                    };

                    // When you set onclick to true, you actually just don't set it
                    // to false, because onclick is a handler function, not a boolean
                    if (opts) {
                        $.each(options, function(key,val) {
                            if (opts.hasOwnProperty(key) && opts[key] === true) {
                                delete opts[key];
                                delete options[key];
                            }
                        });
                    }
                    options.errorElement = 'span';
                    options.errorClass = insertAfterLabel ? 's3d-error-after' : 's3d-error';

                    // We need to handle success and invalid in the framework first
                    // then we can pass it to the caller
                    var successCallback = false;
                    var invalidCallback = false;

                    if (opts) {
                        if (opts.hasOwnProperty('success') && $.isFunction(opts.success)) {
                            successCallback = opts.success;
                            delete opts.success;
                        }

                        if (opts && opts.hasOwnProperty('invalidCallback') && $.isFunction(opts.invalidCallback)) {
                            invalidCallback = opts.invalidCallback;
                            delete opts.invalidCallback;
                        }
                    }

                    // Don't allow spaces in the field
                    $.validator.addMethod('nospaces', function(value, element) {
                        return this.optional(element) || (value.indexOf(' ') === -1);
                    }, sakai_i18n.getValueForKey('NO_SPACES_ARE_ALLOWED'));

                    // Appends http:// or ftp:// or https:// when necessary
                    $.validator.addMethod('appendhttp', function(value, element) {
                        if (value.substring(0,7) !== 'http://' &&
                            value.substring(0,6) !== 'ftp://' &&
                            value.substring(0,8) !== 'https://' &&
                            $.trim(value) !== '') {
                                $(element).val('http://' + value);
                        }
                        return true;
                    });

                    // Add the methods that were being passed in
                    if (opts && opts.hasOwnProperty('methods')) {
                        $.each(opts.methods, function(key, value) {
                            $.validator.addMethod(key, value.method, value.text);
                        });
                        delete opts.methods;
                    }

                    // Include the passed in options
                    $.extend(true, options, opts);

                    // Success is a callback on each individual field being successfully validated
                    options.success = function($label) {
                        // For autosuggest clearing, since we have to put the error on the ul instead of the element
                        if (insertAfterLabel && $label.next('ul.as-selections').length) {
                            $label.next('ul.as-selections').removeClass('s3d-error');
                        } else if ($label.prev('ul.as-selections').length) {
                            $label.prev('ul.as-selections').removeClass('s3d-error');
                        }
                        $label.remove();
                        if ($.isFunction(successCallback)) {
                            successCallback($label);
                        }
                    };

                    options.errorPlacement = function($error, $element) {
                        if ($element.hasClass('s3d-error-calculate')) {
                            // special element with variable left margin
                            // calculate left margin and width, set it directly on the error element
                            $error.css({
                                'margin-left': $element.position().left,
                                'width': $element.width()
                            });
                        }
                        // Get the closest-previous label in the DOM
                        var $prevLabel = $form.find('label[for="' + $element.attr('id') + '"]');
                        $error.attr('id', $element.attr('name') + '_error');
                        $element.attr('aria-describedby', $element.attr('name') + '_error');
                        if (insertAfterLabel) {
                            $error.insertAfter($prevLabel);
                        } else {
                            $error.insertBefore($prevLabel);
                        }
                    };

                    options.invalidHandler = function($thisForm, validator) {
                        $form.find('.s3d-error').attr('aria-invalid', 'false');
                        if ($.isFunction(invalidCallback)) {
                            invalidCallback($thisForm, validator);
                        }
                    };

                    options.showErrors = function(errorMap, errorList) {
                        if (errorList.length !== 0 && $.isFunction(options.error)) {
                            options.error();
                        }
                        $.each(errorList, function(i,error) {
                            $(error.element).attr('aria-invalid', 'true');
                            // Handle errors on autosuggest
                            if ($(error.element).hasClass('s3d-error-autosuggest')) {
                                $(error.element).parents('ul.as-selections').addClass('s3d-error');
                            }
                        });
                        this.defaultShowErrors();
                        if ($.isFunction(options.errorsShown)) {
                            options.errorsShown();
                        }
                    };

                    // Set up the form with these options in jquery.validate
                    $form.validate(options);
                }