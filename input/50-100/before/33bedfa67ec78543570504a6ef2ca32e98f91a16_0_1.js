function() {
        if($('#tracking_id').attr('value') == '') {
            alert('Нужен номер трекинга');
        } else {
            $.ajax({
                url: "/",
                type: "POST",
                data: {
                    tid: $('#tracking_id').attr('value'),
                },
            }).success(function(data) {
                $('.warehouse').fadeIn('slow').append(data);
                $('h2').fadeOut('fast');
            });
        }
    }