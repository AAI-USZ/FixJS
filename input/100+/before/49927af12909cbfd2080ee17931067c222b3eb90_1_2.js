function (){
        if ($(this).attr("src") == "image/playerpause.png")
        {
			javascript:document.demo.Stop();
            $("#back").attr("src", "image/playerback.png");
            $("#play").attr("src", "image/playerplay.png");
            $(this).attr("src", "image/playerpause2.png");
            $("#stop").attr("src", "image/playerstop.png");
            clearInterval(time_func);
            $($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).stop();
        }
    }