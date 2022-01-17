function refreshCtrlTable(){
        if(AClass = $('#CTRL .menu.type .radio input:radio:checked').val()){
            $('#CTRL tr:not(.'+AClass+')').hide();
            $('#CTRL tr.static').show();
            $('#CTRL tr.'+AClass).show();
            // Afficher/Cacher Température
            if(AClass == 'veri'){
                if($('.menu.lieu .radio input:radio:checked').val() == 'S')
                    $('#CTRL tr.site').show();
                else
                    $('#CTRL tr.site').hide();
            }
        }else{
            $('#CTRL tr:not(.menu)').hide();
        }
    }