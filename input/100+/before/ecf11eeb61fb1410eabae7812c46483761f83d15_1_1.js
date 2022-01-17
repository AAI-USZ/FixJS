function () {

        // set jquery validator default values
        $.validator.setDefaults({
            highlight: function(element, errorClass, validClass) {
                validClass = 'success';
                $(element).parents('.control-group').addClass(errorClass).removeClass(validClass);
            },
            unhighlight: function(element, errorClass, validClass) {
                validClass = 'success';
                $(element).parents('.control-group').removeClass(errorClass).addClass(validClass);
            },
            errorPlacement: function (error, element) {
                element.parents('.control-group').find('.help-block').html(error);
            },
            success: function (label) {
                $('#' + label.attr('for')).parents('.control-group').find('.help-block').html('This field is verified');
            },
            errorElement: 'span'
        });

        // add jquery validator regexp method for precise matching
        $.validator.addMethod('regexp', function(value, element, param) {
            return this.optional(element) || value.match(param);
        }, 'This value doesn\'t match the acceptable pattern.');


        $('form').validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                    /*
                    remote: {
                        url: '/validation/email',
                        data: {
                            value: function () {
                                return $('#email').val();
                            }
                        }
                    }
                    */
                },
                name: {
                    required: true,
                    minlength: 5,
                    maxlength: 30,
                    regexp: /^([A-Za-z0-9_-]{5,30})$/,
                    /*
                    remote: {
                        url: '/validation/name',
                        data: {
                            value: function () {
                                return $('#name').val();
                            }
                        }
                    }
                    */
                }
            },
            messages: {
                email: {
                    //required: 'Please enter your email here.',
                    email: 'Please enter a valid email here.',
                    remote: 'This email is alredy in use, please login.'
                },
                name: {
                    //required: 'Please enter your canistro\'s name.',
                    minlength: 'Please enter a name with minimum 5 chars.',
                    maxlength: 'Please enter a name with maximum 30 chars.',
                    regexp: 'Please enter only alfa-numeric chars.',
                    remote: 'This name is already in use, please try another one.'
                }
            }
        });
    }