function (){
        if ($(this).attr("src") == "image/playerback.png")
        {
            javascript:document.demo.Stop();
            javascript:document.demo.SetTime(0);
            document.demo.SetRate($(".tempo").text()/cur_tempo);
            $(".overflow_svg").css("overflow-y", "hidden");
            $(".overflow_svg").scrollTo( 0, 1000, {axis:'y'});
            $(this).attr("src", "image/playerback2.png");
            $("#play").attr("src", "image/playerplay.png");
            $("#pause").attr("src", "image/playerpause.png");
            $("#stop").attr("src", "image/playerstop.png");
            if (selected != 0)
            {
                $("img[id^='m_']").each(function (i, v){
					$(this).attr({"src" : "image/casegrise.png"});
				});
                $("img[id='m_0']").attr("src", "image/casebleue.png");
                selected = 0;
            }
            setTimeout(function (){
                $("#back").attr("src", "image/playerback.png");
            }, 500);
			Animation_Play(selected);
        }
    }