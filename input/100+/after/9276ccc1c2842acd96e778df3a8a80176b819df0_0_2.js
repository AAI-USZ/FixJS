function () {
        var url = $(this).attr('href');
        var clase = $(this).find('.icono').attr('class').split(" ")[0];
        var cual;
        var dim = -1;
        $('#sub-dock .option').each(function (index) {
            if (index < 5) {
                if ($(this).css('display') != "none") {
                    cual = $(this);
                    dim += 1;
                }
            }
        });
        var este = $(this).parent().parent();
        $.ajax({
            url:$(this).attr('href'),
            type:"GET",
            success:function (data) {
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
        });

        return false;
    }