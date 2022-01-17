function(){

    nb_measure = partition._instruments_list[0]._track_part._measure_list.length;
    var g_tempo = partition._instruments_list[0]._track_part._measure_list[0]._sound_params._tempo;
    var beat = partition._instruments_list[0]._track_part._measure_list[0]._attributes._time_beat;
    measure(nb_measure);
    tracks(partition._instruments_list);

    /// SECTION EVENT PLAYER
    
    $("#back").hover(function (){ //IN Handler
        if ($(this).attr("src") != "image/backactif.png")
            {
                $(this).attr("src", "image/backhover.png");
            }
     }, function ()
     { //Out Handler
      if ($(this).attr("src") != "image/backactif.png")
          {
              $(this).attr("src", "image/back.png");
          }  
     });

    $("#back").click(function (){
        if ($(this).attr("src") == "image/backhover.png")
        {
            javascript:document.demo.Stop();
            javascript:document.demo.SetTime(0);
            document.demo.SetRate($(".tempo").text()/cur_tempo);
            $(".overflow_svg").css("overflow-y", "hidden");
            $(".overflow_svg").scrollTo( 0, 1000, {axis:'y'});
            $(this).attr("src", "image/backactif.png");
            $("#play").attr("src", "image/play.png");
            $("#pause").attr("src", "image/pause.png");
            $("#stop").attr("src", "image/stop.png");
            if (selected != 0)
            {
                $("img[id^='m_']").each(function (i, v){
					$(this).attr({"src" : "image/casegrise.png"});
				});
                $("img[id='m_0']").attr("src", "image/casebleue.png");
                selected = 0;
            }
            setTimeout(function (){
                $("#back").attr("src", "image/back.png");
            }, 500);
			Animation_Play(selected);
        }
    });
    
     $("#play").hover(function (){ //IN Handler
         if ($(this).attr("src") != "image/playactif.png")
             {
                 $(this).attr("src", "image/playhover.png");
             }
     }, function ()
     { //Out Handler
      if ($(this).attr("src") != "image/playactif.png")
          {
              $(this).attr("src", "image/play.png");
          }
     });

    $("#play").click(function (){
        
        if ($(this).attr("src") == "image/playhover.png")
        {
        	//bloquage du scroll utilisateur
        	$(".overflow_svg").css("overflow-y", "hidden");
                $(".overflow_measure").css("overflow-x", "hidden");
        	//-------
            document.demo.SetRate($(".tempo").text()/cur_tempo);
			$("#back").attr("src", "image/back.png");
            $(this).attr("src", "image/playactif.png");
            $("#pause").attr("src", "image/pause.png");
            $("#stop").attr("src", "image/stop.png");
			Animation_Play(selected);
		}
    });

    function getTime()
	{
		return (document.demo.GetTime() / document.demo.GetTimeScale() * 1000);
	}

	// A partir d'un temps MIDI, renvoi le temps correspondant en millisecondes
	function MIDItoSecond(midi_time, tempo)
	{
		return midi_time * ((60/ tempo) * 1000) / 480 ;
	}

	// A partir d'un temps en millisecondes, renvoi le temps MIDI correspondant
	function SecondtoMIDI(ms, tempo)
	{
		return (ms * 480) / ((60 / tempo) * 1000);
	}
	   
	// TOUCHE ENTER PRESS
	$(document).keyup(function (e){
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
	});
	   
	//variable pour le scroll
	var ancient = 0;
	var hasScrolled  = false;
	var vertic = false;
	var ref = 0;
	var scroll = 280;
	var onglet = false;
	//------------------------------------  
	
	function Animation_Play(index_m)
	{
		
		selected = index_m;
		
		var delay_ms = 350;
		var delay_midi = SecondtoMIDI(delay_ms,g_tempo);
		var time_ms = getTime();
		var time_midi = SecondtoMIDI(time_ms, g_tempo);
		   
		var cur_mesure = partition._instruments_list[current_svg]._track_part._measure_list[index_m];
		for (var i = 0; i < cur_mesure._chord_list.length; i++)
		{
			var chord = cur_mesure._chord_list[i];
			if (chord._note_list[0]._begin + delay_midi > time_midi) // MIDI EN RETARD SUR NOTE
			{
				var delta = chord._note_list[0]._begin + delay_midi - time_midi;
				timeout = setTimeout(function(){
								Animation_Play(index_m);
						}, MIDItoSecond(delta, g_tempo));
				return;
			}
			else
			{
				if (delay_midi + chord._note_list[0]._begin + chord._note_list[0]._duration >= time_midi) // MIDI SYNCHRO AVEC LA NOTE
				{
					MoveCursor(chord._note_list[0]._posX, chord._note_list[0]._posY, chord._note_list[0]);
					var delta = chord._note_list[0]._begin + delay_midi - time_midi;
					var midi_duration = chord._note_list[0]._duration + delta;
					var ms_duration = MIDItoSecond(midi_duration, g_tempo);
				   
					if (i != cur_mesure._chord_list.length - 1) // On est pas sur la derniere note
					{
						timeout = setTimeout(function(){
								Animation_Play(index_m);
						}, ms_duration);
						return;
					}
					else // On est sur la derniere note de la mesure
					{
						if (index_m != partition._instruments_list[current_svg]._track_part._measure_list.length - 1) // Si on est pas sur la derniere mesure
						{
						   
							timeout = setTimeout(function(){
									Animation_Play(index_m + 1);
							}, ms_duration);
							return;
						}
					}
				}
				if (i == cur_mesure._chord_list.length - 1 && index_m != partition._instruments_list[current_svg]._track_part._measure_list.length - 1) // Si on est sur la derniere note mais pas la derniere mesure
				{
					Animation_Play(index_m + 1); // On avance à la mesure suivante
				}
			}
		}
	}

	function MoveCursor(x, y, note)
	{
		var xbis = x - 60;
		if (note._fret_technical != null)
		{
			if (note._fret_technical.length == 2)
			{
				xbis += 5;
			}
			else
			{
				 xbis += 2;
			}
		}

		$($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).attr({"y": y - 10});
		$($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).animate({svgTransform: 'translate(' + xbis + ' 0)'}, 0, 'linear');
		
		/*
		 * 
		 * code de scroll
		 * 
		 */	
		if (onglet == true)
		{
			//r�cup�ration de la position courante du curseur.
			scroll = ($("rect[id='cursor_" + current_svg + "']").attr("y"));	
			scroll = parseInt(scroll);
			$(".overflow_svg").scrollTo(scroll - 15, 0, {axis:'y'});
			
			res = (((scroll - 20) / 90) % 3);
			ancient = scroll;
			//prochaine 
			scroll += 265;
			
			
			//mise a jour des valeur bool�ennes.
			hasScrolled = true;
			onglet = false;
		}

		
		var test = ($("rect[id='cursor_" + current_svg + "']").attr("y") - 20) / 90;
		/*
		console.log("valeur de test/90 : " + test);
		*/
		if (($("rect[id='cursor_" + current_svg + "']").attr("y") > 20) && (test % 3 == ref) && (hasScrolled == false))
		{
			hasScrolled = true;
			ancient = $("rect[id='cursor_" + current_svg + "']").attr("y");
			console.log ("va a posiiton : " + scroll);
			$(".overflow_svg").scrollTo ($("rect[id='cursor_" + current_svg + "']").attr("y") - 10, 0, {axis:'y'});
		}
	
		if (ancient != ($("rect[id='cursor_" + current_svg + "']").attr("y")) && (hasScrolled == true))
		{
			hasScrolled = false;
		}
		
		$("img[id^='m_']").each(function (i, v){
			$(this).attr({"src" : "image/casegrise.png"});
		})
		
		$(".progress_bar img[id='m_"+ selected + "']").attr("src", "image/casebleue.png");
		 
		if ((selected >= 28) && (selected % 14 == 0) && vertic == false)
		{
			vertic = true;
			$(".bar").scrollTo("img[id='m_"+ selected + "']", 0, {axis:'x'});
		}
		if (vertic == true && (selected % 30 != 0))
		{
			vertic = false;
		}
		 
		 /*
		  *
		  * fin du code de scroll
		  * 
		  */
	}

     $("#pause").hover(function (){ //IN Handler
        if ($(this).attr("src") != "image/pauseactif.png")
            {
                $(this).attr("src", "image/pausehover.png");
            }
     }, function ()
     { //Out Handler
      if ($(this).attr("src") != "image/pauseactif.png")
          {
              $(this).attr("src", "image/pause.png");
          } 
     });
     
    $("#pause").click(function (){
        if ($(this).attr("src") == "image/pausehover.png")
        {
            javascript:document.demo.Stop();
            $("#back").attr("src", "image/back.png");
            $("#play").attr("src", "image/play.png");
            $(this).attr("src", "image/pauseactif.png");
            $("#stop").attr("src", "image/stop.png");
            $($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).stop();
            $(".overflow_svg").css("overflow-y", "auto");
            $(".overflow_measure").css("overflow-x", "auto");
        }
    });

     $("#stop").hover(function (){ //IN Handler
         if ($(this).attr("src") != "image/stopactif.png")
            {
                $(this).attr("src", "image/stophover.png");
            }
     }, function ()
     { //Out Handler
       if ($(this).attr("src") != "image/stopactif.png")
       {
          $(this).attr("src", "image/stop.png");
       }
         
     });
    $("#stop").click(function (){
        if ($(this).attr("src") == "image/stophover.png")
        {
            clearTimeout(timeout);
            javascript:document.demo.Stop();
            javascript:document.demo.SetTime(0);
            $(".overflow_svg").css("overflow-y", "auto");
            $("#back").attr("src", "image/back.png");
            $("#play").attr("src", "image/play.png");
            $("#pause").attr("src", "image/pause.png");
            $(this).attr("src", "image/stopactif.png");
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
                $("#stop").attr("src", "image/stop.png");
            }, 500);
            
            for (var j = 0; j < svg_inst.length; j++)
            	{
            	$($("rect[id='cursor_"+current_svg+"']"), svg_inst[j].root()).attr({"y": 20});
    			$($("rect[id='cursor_"+current_svg+"']"), svg_inst[j].root()).animate({svgTransform: 'translate(0 0)'}, 0, 'linear');
            	}
            
			/*$($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).stop();*/
			
        }
    });

    /// SECTION INITIALISATION GRAPHIQUE MESURES + TRACKS

    function measure(i)
    {
        for (var j = 0; j < i; j++)
        {
            if (j == 0)
            {
                $(".progress_bar tr:first-child").append("<td><img id='m_" + j + "' src='image/casebleue.png' /></td>");
                $(".progress_bar tr:nth-child(2)").append("<td>" + (j+1) + "</td>");
            }
            else
            {
                $(".progress_bar tr:first-child").append("<td><img id='m_" + j + "' src='image/casegrise.png' /></td>");
                $(".progress_bar tr:nth-child(2)").append("<td>" + (j+1) + "</td>");
            }
        }
    }

    function tracks(instruments)
    {
		$("#panel_pistes").empty();
        for (var i = 0; i < instruments.length;i++)
        {
            if (i == 0)
            {
                $("#panel_pistes").append("<li id='t_"+i+"' class='piste piste_selected'>" + instruments[i]._name_instrument + "</li>");
            }
            else
            {
                $("#panel_pistes").append("<li id='t_"+i+"' class='piste'>" + instruments[i]._name_instrument + "</li>");
            }
        }/*
        $(".instruments").append("<section class='clear'></section>");*/
    }

    /// SECTION EVENT MESURES + TRACKS SELECTION




    $(".piste").click(function(){
		// deselectionner l'onglet selectionné
		$(".piste_selected")
			.removeClass('piste_selected')
		// sélectionner l'onglet sur lequel on a cliqué
		$(this)
			.addClass('piste_selected')

        var id = $(this).attr("id");
        var array = id.split('_');
        $(".tab_svg #"+current_svg).css("display", "none");
      
        current_svg = array[1];
        
        $(".tab_svg #"+current_svg).css("display", "block");   
        onglet = true;
    });
	
	var scrollTop = 0;
	var lastScroll = 0;
	
	$(".instruments").scroll(function(e){
		var self = $(this);
		if (e.timeStamp - lastScroll > 100)
		{
			lastScroll = e.timeStamp;
			var scrollTopTmp = self.scrollTop();
			if (scrollTop > scrollTopTmp)
			{
				scrollTopTmp = scrollTop - 30;
			}
			else
			{
				scrollTopTmp = scrollTop + 30;
			}
			self.scrollTop(scrollTopTmp);
			scrollTop = scrollTopTmp;
		}
		else
		{
			self.scrollTop(scrollTop);
		}
	});

    /// SECTION SCROLLBARS
	$("#volume").slider({
		animate: "slow",
		value: 100,
		orientation: "horizontal",
		step: 1,
		slide: function (event, ui){
			document.demo.SetVolume(Math.floor(ui.value*2.56));
			if (ui.value == 0)
			{
				if (!$("#speaker").hasClass("speakoff"))
				{
					$("#speaker").removeClass("speakon").addClass("speakoff");
				}
			}
			else if (!$("#speaker").hasClass("speakon"))
			{
				$("#speaker").removeClass("speakoff").addClass("speakon");
			}
		}
	});
	
	$("#speaker").click(function (){
		var ismute = !document.demo.GetMute();
		document.demo.SetMute(ismute);
		if (ismute)
		{
			$("#speaker").removeClass("speakon").addClass("speakoff");
		}
		else
		{
			$("#speaker").removeClass("speakoff").addClass("speakon");
		}
	});
	
	/*
	 * 
	 * scoll sur la bar de progression avec click sur les fleches.
	 * 
	 */

	var progress_scroll = selected ;
	
	$(".left").click(function ()
	{
		
		if (progress_scroll - 1 >= 0)
		{
			progress_scroll -= 1;
		}
		
		
		
		$(".bar").scrollTo($(".bar img[id='m_"+progress_scroll+"']"), 0, {axis:"x"});
	});
	
	$(".right").click(function ()
	{	
		if (selected > progress_scroll)
		{
			progress_scroll = selected;
		}
		
		progress_scroll +=1;
		$(".bar").scrollTo($(".bar img[id='m_"+progress_scroll+"']"), 0, {axis:"x"});
	});
	
	$(".left").mousehold(function ()
			{
								
				if (progress_scroll - 1 >= 0)
				{
					progress_scroll -= 1;
				}
				
				$(".bar").scrollTo($(".bar img[id='m_"+progress_scroll+"']"), 0, {axis:"x"});
			});
	
	$(".right").mousehold(function ()
	{
		if (selected > progress_scroll)
		{
			progress_scroll = selected;
		}
		
		progress_scroll += 1;
		
		$(".bar").scrollTo($(".bar img[id='m_"+progress_scroll+"']"), 0, {axis:"x"});
	});
	
	console.log('event');
}