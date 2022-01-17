function() {
        var form = this;
        var $form = $(this);
        var check = $form.attr('data-jsvalidation');
        var autosave = $form.attr('data-jsautosave');

        // {{{ validate
        // validate on blur or change
        if ((check == 'blur') || (check == 'change')) {
            // @todo add also event for "submit" nonetheless
            $form.validator({
                effect: 'depageEffect',
                inputEvent: check,
                errorInputEvent: check
            });
        // validate on submit
        } else if (check == 'submit') {
            $form.validator({
                effect: 'depageEffect',
                // do not validate inputs when they are edited
                errorInputEvent: null
            });
        }
        // }}}
        // {{{ add inFail and onSuccess handlers
        $form.bind("onFail", function(e, errors) {
            // error found
            $form.find(".submit").addClass("error");
        });
        $form.bind("onSuccess", function(e, errors) {
            // count error messages, because onSuccess is called for a successful validated input
            var errNum = $form.find(".errorMessage").length;

            if (errNum > 0) {
                $form.find(".submit").addClass("error");
            } else {
                $form.find(".submit").removeClass("error");
            }
        });
        // }}}
        // {{{ hide errormessages on click
        $form.delegate('.error input', 'focus', function(event) {
            $(this).parents('.error').find('.errorMessage').hide();
        });
        // }}}
        
        // {{{ autosave
        if (autosave == "true") {
            var saveInterval = 1000;
            var now = new Date();

            form.data = form.data || {};
            form.data.saving = false;
            form.data.lastsave = now.getTime();
            form.data.timer = null;

            form.data.autosave = function() {
                var data = {};

                $("input, select, textarea", form).each( function () {
                    // @todo check for radio buttons and checkboxes and save only checked
                    var type = $(this).attr("type");
                    if ((type == "radio" || type == "checkbox")) {
                        if (this.checked) {
                            data[this.name] = this.value;
                        }
                    } else {
                        data[this.name] = this.value;
                    }
                });

                data['formAutosave'] = "true";
                form.data.saving = true;

                $.post(form.action, data, function(response, textStatus) {
                    now = new Date();

                    form.data.lastsave = now.getTime();
                    form.data.saving = false;
                });
            };
            form.data.changed = function(saveImmediately) {
                now = new Date();
                clearTimeout(form.data.timer);

                if (!form.data.saving) {
                    if (saveImmediately || now.getTime() - form.data.lastsave > saveInterval) {
                        form.data.autosave();
                    } else {
                        setTimeout(function() {
                            form.data.changed();
                        }, saveInterval);
                    }
                }
            };

            $("input, select, textarea", form).change( function() {
                form.data.changed(true);
            });
            // only for textarea and richtext
            $("textarea", form).keyup( function() {
                form.data.changed();
            });
        }
        // }}}

        // {{{ add handlers to textarea
        $('.input-textarea', form).each(function() {
            var options = $.parseJSON($(this).attr('data-textarea-options'));
            var $textarea = $("textarea", this);
            var $textareaSize = $("<textarea class=\"textarea-size\"></textarea>").appendTo($textarea.parent()).height("auto").css({
                position: "absolute",
                left: "-10000px"
            });

            if (options.autogrow && !$.browser.msie) {
                $textarea.autogrow = function() {
                    $textareaSize[0].value = $textarea[0].value;

                    // set new height
                    var newHeight = $textareaSize[0].scrollHeight + 30;
                    $textarea.height(newHeight);
                }
                $textarea.mouseup(function() {
                }).keyup( function() {
                    $textarea.autogrow();
                }).keydown( function() {
                    $textarea.autogrow();
                }).scroll( function() {
                    $textarea.autogrow();
                }).autogrow();
            }
        });
        // }}}
        // {{{ add richtext-editor to richtext inputs
        $('.input-richtext', form).each(function() {
            var options = $.parseJSON($(this).attr('data-textarea-options')) || $.parseJSON($(this).attr('data-richtext-options'));
            var $textarea = $("textarea", this);

            $textarea.depageEditor(options);
        });
        // }}}

        // {{{ focus first input with autofocus
        $('input[autofocus]:first', form).focus();
        // }}}
        
        // {{{ add missing "http://" to url inputs
        $("input[type='url']", form).change( function() {
            if (this.value != "" && !this.value.match(/[a-z][\w-]+:\/\/.*/)) {
                this.value = "http://" + this.value;
            }
        });
        // }}}
    }