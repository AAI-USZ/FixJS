function(e){
            e.preventDefault();

            var url = $('#confirm-guests-form').attr("action");
            var data = $('#confirm-guests-form').serialize();
            console.log(data);
            $.post(url, data, function(data, textStatus) {
                $('.notice-success').html(data.notice).slideDown('slow').delay(3000).slideUp('slow');
            });

//            $('#confirm-guests-form').submit();
        }