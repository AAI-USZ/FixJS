function mailFailed(e) {
        $('.mailsent-dialog').html('<p>Vérifiez vôtre adresse mail</p>');
        $('.mailsent-dialog').fadeIn().delay(1000).fadeOut();
    }