function() {
        var tid = $('#tracking_id').attr('value');
        if(tid == '') {
            fail('Требуется правильный код трекинга');
        } else {
            $.ajax({
                url: "/",
                type: "POST",
                data: {
                    tid: $('#tracking_id').attr('value'),
                }
            }).success(function(d) {
                $('.warehouse').prepend(d).show();
                $('h2').fadeOut('fast');
                success("Объект "+tid+" успешно добавлен.");
            });
        }
    }