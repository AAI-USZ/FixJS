function(d) {
                $('.warehouse').prepend(d).show();
                $('h2').fadeOut('fast');
                success("Объект "+tid+" успешно добавлен.");
            }