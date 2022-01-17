function(message, durationInMilliseconds){

        var placeholder = addInput.attr('placeholder');

        addInput.val('').blur().attr('placeholder', message);

        window.setTimeout(function () {

            addInput.attr('placeholder', placeholder);

        }, durationInMilliseconds);

    }