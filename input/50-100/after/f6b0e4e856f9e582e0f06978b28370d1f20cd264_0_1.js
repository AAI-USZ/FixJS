function (){
        if ($(this).attr("src") == "image/playerplay.png")
        {
			//javascript:document.demo.Play();
            document.demo.SetRate($(".tempo").text()/cur_tempo);
			$("#back").attr("src", "image/playerback.png");
            $(this).attr("src", "image/playerplay2.png");
            $("#pause").attr("src", "image/playerpause.png");
            $("#stop").attr("src", "image/playerstop.png");
			/*setTimeout(function () {
				$($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).animate({svgTransform: 'translate(820 0)'}, speed - elapsed_time, 'linear', keep_playing);
			}, 500);*/
                  /*      alert (MIDItoSecond(314880, g_tempo));
            alert (document.demo.GetDuration() / document.demo.GetTimeScale() * 1000);*/
		Animation_Play(current_index);
		}
    }