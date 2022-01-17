function (data) {
                $('#modal-body').hide();
                $('#modal-login').append(data);
                $('#bootstrap-modal').modal('show');
                $('#login_form').submit(function (e) {
                    e.preventDefault();
                    $.ajax({
                        type: 'POST',
                        url: Routing.generate('claro_security_login_check'),
                        cache: false,
                        data: $('#login_form').serialize(),
                        success: function (data) {
                            $('#bootstrap-modal').modal('hide');
                            callBack();
                        }
                    });
                });
            }