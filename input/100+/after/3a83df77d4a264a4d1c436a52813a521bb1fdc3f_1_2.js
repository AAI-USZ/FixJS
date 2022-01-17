function () {
        $(this).parent().fadeOut(250, function () {
            $(this).remove();
            $('.header .searcharea .searchbox .searchinput').focus();
            $(".header .searcharea .searchbox .addbutton").css("opacity", "1");
            addedNum();
        });

    }