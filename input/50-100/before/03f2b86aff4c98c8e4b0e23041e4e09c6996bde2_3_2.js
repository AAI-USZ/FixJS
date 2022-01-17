function(message, durationInMilliseconds){

        var placeholder = _addInput.attr('placeholder');

        _addInput.val('').blur().attr('placeholder', message);

        window.setTimeout(function () {

            _addInput.attr('placeholder', placeholder);

        }, durationInMilliseconds);

    }