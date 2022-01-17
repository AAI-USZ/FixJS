function (){
        if ($(this).attr("src") == "image/playerstop.png")
        {
            clearTimeout(timeout);
            javascript:document.demo.Stop();
            javascript:document.demo.SetTime(0);
            $(".overflow_svg").css("overflow-y", "auto");
            $("#back").attr("src", "image/playerback.png");
            $("#play").attr("src", "image/playerplay.png");
            $("#pause").attr("src", "image/playerpause.png");
            $(this).attr("src", "image/playerstop2.png");
            $(".overflow_svg").scrollTo( 0, 1000, {axis:'y'});
            $(".overflow_measure").scrollTo( 0, 1000, {axis:'x'});
            scroll = 280;
            sline = 0;
            if (selected != 1)
            {
                $("img[id='m_" + selected+ "']").attr("src", "image/casegrise.png");
                $("img[id='m_1']").attr("src", "image/casebleue.png");
                selected = 1;
            }
            setTimeout(function (){
                $("#stop").attr("src", "image/playerstop.png");
            }, 500);
        }
    }