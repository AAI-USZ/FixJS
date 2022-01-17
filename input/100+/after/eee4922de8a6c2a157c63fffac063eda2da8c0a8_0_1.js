function () {
            var $form = $('form.pods-submittable');
            $form.on('change keyup', 'input.pods-validate.pods-validate-required, select.pods-validate.pods-validate-required, textarea.pods-validate.pods-validate-required', function () {
                var $el = $(this);

                $el.removeClass('pods-validate-error');

                if (!$el.is(':visible'))
                    return;

                if (0 < $el.parent().find('label').length)
                    var label = $el.parent().find('label').html().trim();
                else
                    var label = $el.prop('name').trim().replace('_', ' ');
                if ($el.is('input[type=checkbox]') && !$el.is(':checked')) {
                    if (0 == $el.parent().find('.pods-validate-error-message').length)
                        $el.parent().append('<div class="pods-validate-error-message">' + label + ' is required.</div>');
                    $el.addClass('pods-validate-error');
                }
                else if ('' == $el.val() || 0 == $el.val()) {
                    if (0 == $el.parent().find('.pods-validate-error-message').length)
                        $el.parent().append('<div class="pods-validate-error-message">' + label + ' is required.</div>');
                    $el.addClass('pods-validate-error');
                }
                else {
                    $el.parent().find('.pods-validate-error-message').remove();
                    $el.removeClass('pods-validate-error');
                }
            });
        }