function (data) {
            if (data == 'success') {
                $('.alert-success').removeClass('out, hide').addClass('in').alert();
                sound_message.play();
                // update shopping cart
                $.update_cart('get'); 
                setTimeout(function () {$('#modal-form').modal('hide');}, 5000);
                _gaq.push(['_trackEvent', 'canistro-store', 'success'])
            }
        }