function showMessage(elementId, data) {
        console.dir(data);
        $(elementId).html(data).fadeIn('fast', function(){
            var me = $(this);
            setTimeout(function(){
                me.fadeOut('fast');
            }, 5000);
        });
    }