function (e) {
        e.preventDefault();
        //$.post('/create', $('form').serializeArray(), function (data) {
        //    if (data == 'success') {
                $('.alert-success').removeClass('out, hide').addClass('in').alert();
                sound_message.play();
                // TODO reset here or after closing alert and form?
                setTimeout(function () {$.reset_form();}, 5000);
        //    }
        //});
    }