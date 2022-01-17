function(id){
            if($('#go_new').is(':checked'))
                window.location = '/fragment/'+id;
            else
                location.reload();
        }