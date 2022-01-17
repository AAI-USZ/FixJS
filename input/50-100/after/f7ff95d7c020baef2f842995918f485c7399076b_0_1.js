function error_to_get_data(jqXHR, textStatus, errorThrown){
            $('#border').css('border-color', 'red')
            .css('background', '#FFAAAA');
            if($("#ajaxerror").length == 0){
                $('#border').after("<p id='ajaxerror'>Conection lost");
                $('#detail').text('');
            }
        }