function(){

            $("#cancel_button").bind("click", function(ev){
                document.location = sakai.config.URL.GATEWAY_URL;
            });

            $("#username").bind("keyup blur", function(){
                var username = $.trim($(usernameField).val());
                if (usernameEntered != username) {
                    usernameEntered = username;
                    if (username && username.length > 2 && username.indexOf(" ") === -1) {
                        $(usernameField).removeClass("signup_form_error");
                        checkUserName(true, function(success){
                            $("#create_account_username_error").hide();
                            if (success) {
                                $(usernameField).removeClass("signup_form_error");
                                $(usernameField).addClass("username_available_icon");
                                $("." + $(usernameField)[0].id).removeClass("signup_form_error_label");
                            } else {
                                $(usernameField).removeClass("username_available_icon");
                            }
                        });
                    } else {
                        $(usernameField).removeClass("username_available_icon");
                    }
                }
            });

            $('#password').on('keyup', checkPasswordStrength);

            var validateOpts = {
                rules: {
                    password: {
                        minlength: 4
                    },
                    password_repeat: {
                        equalTo: "#password"
                    },
                    username: {
                        minlength: 3,
                        nospaces: true,
                        validusername: true
                    }
                },
                messages: {
                    firstName: $(firstNameEmpty).text(),
                    lastName: $(lastNameEmpty).text(),
                    email: {
                        required: $(emailEmpty).text(),
                        email: $(emailInvalid).text()
                    },
                    username: {
                        required: $(usernameEmpty).text(),
                        minlength: $(usernameShort).text(),
                        nospaces: $(usernameSpaces).text()
                    },
                    password: {
                        required: $(passwordEmpty).text(),
                        minlength: $(passwordShort).text()
                    },
                    password_repeat: {
                        required: $(passwordRepeatEmpty).text(),
                        passwordmatch: $(passwordRepeatNoMatch).text()
                    }
                },
                'methods': {
                    'validusername': {
                        'method': function(value, element) {
                            return this.optional(element) || checkUserName();
                        },
                        'text': sakai.api.i18n.getValueForKey('THIS_USERNAME_HAS_ALREADY_BEEN_TAKEN')
                    }
                },
                submitHandler: function(form, validator){
                    doCreateUser();
                    return false;
                }
            };
            sakai.api.Util.Forms.validate($("#create_account_form"), validateOpts);
        }