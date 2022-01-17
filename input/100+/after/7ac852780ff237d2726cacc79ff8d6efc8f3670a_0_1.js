function handleReviewOverlay(overlay) {
                // Stuff that is common to Edit and Reply.
                var $form = overlay.find('form');

                // Remove character counter on review field on mobile for now
                // (770661).
                if (z.capabilities.getDeviceType() != 'mobile') {
                    initCharCount();
                }

                function validate() {
                    var $error = overlay.find('.req-error'),
                        $comment = overlay.find('textarea'),
                        msg = $comment.val().strip(),
                        $parent = $comment.closest('.simple-field'),
                        $cc = overlay.find('.char-count'),
                        valid = !$cc.hasClass('error') && msg;
                    if (valid) {
                        $parent.removeClass('error');
                        $error.remove();
                        overlay.off('submit.disable', 'form');
                    } else {
                        if (!$parent.hasClass('error')) {
                            $parent.addClass('error');
                        }
                        if (!msg && !$error.length) {
                            $(format('<div class="error req-error">{0}</div>',
                                     gettext('This field is required.'))).insertBefore($cc);
                        }
                        overlay.on('submit.disable', 'form', false);
                    }
                    return valid;
                }

                overlay.addClass('show');

                overlay.on('submit', 'form', _pd(function(e) {
                    // Trigger validation.
                    if (validate(e)) {
                        $.post($form.attr('action'), $form.serialize(), function() {
                            $(window).trigger('refreshfragment');
                        });
                    }
                })).on('click', '.cancel', _pd(function() {
                    overlay.removeClass('show');
                })).on('change.comment keyup.comment', 'textarea', _.throttle(validate, 250));
            }