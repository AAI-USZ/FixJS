function (evt) {
        var address = $('#address').val(),
            button = $('button', this);
        evt.preventDefault();
        if (!address) {
            return; // don't search if empty
        }
        button.text('Please Wait').attr('disabled', 'disabled');
        $('#info').children().hide();
        $('#info').removeClass('hide');
        $.ajax({
            url: '/findLocation',
            data: {str: address},
            dataType: 'xml',
            success: handleLocationResponse,
            complete: function () { button.text('Go').removeAttr('disabled'); }
        });
    }