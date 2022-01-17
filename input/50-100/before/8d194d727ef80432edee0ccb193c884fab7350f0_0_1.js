function showSuccessMessage(data) {
        $('#successMsg').html(data).fadeIn('fast', function(){
            var me = $(this);
            setTimeout(function(){
                me.fadeOut('fast');
            }, 5000);
        });
    }