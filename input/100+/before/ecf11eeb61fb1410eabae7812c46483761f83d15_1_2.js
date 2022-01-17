function () {

    // simple method validate form, to config jquery validator
    $.validate_form = function () {

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
    };

    $.validate_form();


    var sound_incorrect = new Audio('/snd/incorrect.wav');
    // method done while clicking to send the form
    $.done = function (e) {
        e.preventDefault();
        _gaq.push(['_trackEvent', 'canistro-home', 'done'])
        $('form').validate();
        if (!$('form').valid()) {
            sound_incorrect.play();
            return false;
        }
        $('form').submit();
    };

    // reset form after successful post
    $.reset_form = function () {
        $('form input').val('');
        $('form .success').removeClass('success');
        $('#email').parents('.control-group').find('.help-block').html('enter your email address here');
        $('#name').parents('.control-group').find('.help-block').html('enter your canistro\'s name here');
        $('.alert-success').removeClass('in').addClass('out, hide');
    };

    var sound_message = new Audio('/snd/message.wav');
    // submit the form after successful validation
    $.submit = function (e) {
        e.preventDefault();
        //$.post('/create', $('form').serializeArray(), function (data) {
        //    if (data == 'success') {
                $('.alert-success').removeClass('out, hide').addClass('in').alert();
                sound_message.play();
                // TODO reset here or after closing alert and form?
                setTimeout(function () {$.reset_form();}, 5000);
        //    }
        //});
    };

    var sound_modal = new Audio('/snd/powerup.wav');
    $.track = function () {
        sound_modal.play();
        _gaq.push(['_trackEvent', 'canistro-home', 'try free'])
    };


    $(document).off('click', '#done').on('click', '#done', $.done);
    $(document).off('submit', 'form').on('submit', 'form', $.submit);
    $(document).off('click', '.btn-success').on('click', '.btn-success', $.track);
}