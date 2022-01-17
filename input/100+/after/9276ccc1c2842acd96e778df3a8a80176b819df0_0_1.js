function (data) {
                $('#dock .triangulo').animate({
                    translateY:dim * 98 + 'px'
                });
                cual.hide();
                $('#extra-' + cual.attr('id')).show();
                este.hide();
                $('#' + clase).show();
                $('#contenido').html(data);
                actual = clase;
                $(window).scrollTop(0);
                window.history.pushState(data, clase, url);
            }