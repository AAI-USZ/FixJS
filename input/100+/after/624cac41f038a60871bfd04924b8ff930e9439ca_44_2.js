function() {
                var validateOpts = {
                    submitHandler: sendMessage,
                    'methods': {
                        'requiredsuggest': {
                            'method': function(value, element) {
                                return value.indexOf(
                                    sakai.api.i18n.getValueForKey('ENTER_CONTACT_OR_GROUP_NAMES', 'sendmessage')) === -1 &&
                                        $.trim($(element).next('input.as-values').val()).replace(/,/g, '') !== '';
                            },
                            'text': sakai.api.i18n.getValueForKey('AUTOSUGGEST_REQUIRED_ERROR')
                        }
                    }
                };
                sakai.api.Util.Forms.validate($sendmessage_form, validateOpts, true);
            }