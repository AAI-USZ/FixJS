function(){
            var ele = $(this).attr('rel');
            if ($(this).attr('checked')== 'checked')
                $('.'+ele+'_button').css('opacity','1');
            else
                $('.'+ele+'_button').css('opacity','0.2');
        }