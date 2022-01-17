function mailFailed(e) {
        $('.mailsent-dialog').html('<p>Vérifiez votre adresse mail</p>');
        $('.mailsent-dialog').fadeIn().delay(1000).fadeOut();
    }