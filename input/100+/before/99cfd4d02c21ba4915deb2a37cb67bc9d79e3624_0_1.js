function (e){
		if (e.keyCode==13)
		{
			if (document.demo.GetRate() != 0) // PAUSE REQUEST
			{
				document.demo.Stop();
				$("#back").attr("src", "image/back.png");
				$("#play").attr("src", "image/play.png");
				$("#pause").attr("src", "image/pauseactif.png");
				$("#stop").attr("src", "image/stop.png");
				$(".overflow_svg").css("overflow-y", "auto");
			}
			else // PLAY REQUEST
			{
				document.demo.SetRate($(".tempo").text()/cur_tempo);
				$("#back").attr("src", "image/back.png");
				$("#play").attr("src", "image/playactif.png");
				$("#pause").attr("src", "image/pause.png");
				$("#stop").attr("src", "image/stop.png");
				$(".overflow_svg").css("overflow-y", "hidden");
				Animation_Play(selected);
			}
		}
	}