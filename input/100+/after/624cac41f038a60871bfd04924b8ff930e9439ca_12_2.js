function(){
            var validateOpts = {
                rules: {
                    curr_pass: {
                        minlength: 4
                    },
                    new_pass: {
                        minlength: 4,
                        newpw: true
                    },
                    retype_pass: {
                        minlength: 4,
                        equalTo: "#new_pass"
                    }
                },
                messages: {
                    retype_pass: {
                        "equalTo": sakai.api.i18n.getValueForKey("PLEASE_ENTER_PASSWORD_TWICE", "accountpreferences")
                    }
                },
                'methods': {
                    'newpw': {
                        'method': function(value, element) {
                            return this.optional(element) || (value !== $('#curr_pass').val());
                        },
                        'text': $(errorPassSame).html()
                    }
                },
                submitHandler: changePass
            };

            // Initialize the validate plug-in
            sakai.api.Util.Forms.validate($(accountPreferencesPasswordChange), validateOpts);

            var validatePreferencesOpts = {
                submitHandler: saveRegionalToMe
            };

            // Initialize the validate plug-in
            sakai.api.Util.Forms.validate($(accountPreferencesPreferencesForm), validatePreferencesOpts);

            var validateEmailOpts = {
                submitHandler: saveEmail
            };

            // Initialize the validate plug-in
            sakai.api.Util.Forms.validate($(accountPreferencesEmailChange), validateEmailOpts);
        }