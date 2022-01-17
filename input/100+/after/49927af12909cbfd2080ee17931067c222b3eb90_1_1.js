function (){
        if ($(this).attr("src") == "image/playerback.png")
        {
            javascript:document.demo.Stop();
            javascript:document.demo.SetTime(0);
            //javascript:document.demo.Play();
            document.demo.SetRate($(".tempo").text()/cur_tempo);
            $(".overflow_svg").scrollTo( 0, 1000, {axis:'y'});
            $(this).attr("src", "image/playerback2.png");
            $("#play").attr("src", "image/playerplay.png");
            $("#pause").attr("src", "image/playerpause.png");
            $("#stop").attr("src", "image/playerstop.png");
            if (selected != 1)
            {
                $("img[id='m_" + selected+ "']").attr("src", "image/casegrise.png");
                $("img[id='m_1']").attr("src", "image/casebleue.png");
                selected = 1;
            }
            setTimeout(function (){
                $("#back").attr("src", "image/playerback.png");
            }, 500);
            /*clearInterval(time_func);
            elapsed_time = 0;
            line = 0;
            $($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).stop();
            $($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).attr({"y": (20 + (80 * line))});
            $($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).animate({svgTransform: 'translate(0 0)'}, 0, 'linear');
            $($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).animate({svgTransform: 'translate(800 0)'}, speed - elapsed_time, 'linear', keep_playing);
            time_func = setInterval(chronotime, 100);*/
			Animation_Play(current_index);
        }
    }