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
            $(".overflow_svg").scrollTo( 0, 0, {axis:'y'});
            $(".bar").scrollTo( 0, 0, {axis:'x'});
            scroll = 280;
            sline = 0;
            if (selected != 0)
            {
                $("img[id='m_" + selected+ "']").attr("src", "image/casegrise.png");
                $("img[id='m_0']").attr("src", "image/casebleue.png");
                selected = 0;
            }
            setTimeout(function (){
                $("#stop").attr("src", "image/playerstop.png");
            }, 500);
            
            for (var j = 0; j < svg_inst.length; j++)
            	{
            	$($("rect[id='cursor_"+current_svg+"']"), svg_inst[j].root()).attr({"y": 20});
    			$($("rect[id='cursor_"+current_svg+"']"), svg_inst[j].root()).animate({svgTransform: 'translate(0 0)'}, 0, 'linear');
            	}
            
			/*$($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).stop();*/
			
        }
    }