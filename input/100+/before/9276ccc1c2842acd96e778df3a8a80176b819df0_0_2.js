function () {
        var url = $(this).attr('href');
        var clase = $(this).find('.icono').attr('class').split(" ")[0];
        $.ajax({
            url:$(this).attr('href'),
            type:"GET",
            success:function (data) {
                $('#contenido').html(data);
                $(window).scrollTop(0);
                window.history.pushState(data, clase, url);
            }
        });

        var cual;

        $('#sub-dock .option').each(function (index) {
            if (index < 5) {
                if ($(this).css('display') != "none") {
                    cual = $(this);
                }
            }
        });

        cual.hide();
        $('#extra-' + cual.attr('id')).show();

        $(this).parent().parent().hide();
        $('#' + clase).show();


        return false;
    }