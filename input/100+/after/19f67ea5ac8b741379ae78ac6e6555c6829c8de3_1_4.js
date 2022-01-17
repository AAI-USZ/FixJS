function(){

    nb_measure = partition._instruments_list[0]._track_part._measure_list.length;
    var g_tempo = partition._instruments_list[0]._track_part._measure_list[0]._sound_params._tempo;
    var beat = partition._instruments_list[0]._track_part._measure_list[0]._attributes._time_beat;
    measure(nb_measure);
    tracks(partition._instruments_list);

    /// SECTION EVENT PLAYER

    $("#back").click(function (){
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
    });

    $("#play").click(function (){
        if ($(this).attr("src") == "image/playerplay.png")
        {
        	//bloquage du scroll utilisateur
        	$(".overflow_svg").css("overflow-y", "hidden");
        	//-------
            document.demo.SetRate($(".tempo").text()/cur_tempo);
			$("#back").attr("src", "image/playerback.png");
            $(this).attr("src", "image/playerplay2.png");
            $("#pause").attr("src", "image/playerpause.png");
            $("#stop").attr("src", "image/playerstop.png");
			Animation_Play(selected);
		}
    });

    function getTime() {
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

        //variable pour le scroll
			var ancient = 0;
			 var hasScrolled  = false;
			 var res = 0;
			 var scroll = 280;
			 var scroll2 = 820;
			 var onglet = false;
       //------------------------------------          

	   
	// TOUCHE ENTER PRESS
	$(document).keyup(function (e){
		if (e.keyCode==13){
			if (document.demo.GetRate() != 0){ // PAUSE REQUEST
				document.demo.Stop();
				$("#back").attr("src", "image/playerback.png");
				$("#play").attr("src", "image/playerplay.png");
				$("#pause").attr("src", "image/playerpause2.png");
				$("#stop").attr("src", "image/playerstop.png");
				$(".overflow_svg").css("overflow-y", "auto");
			}
			else { // PLAY REQUEST
				document.demo.SetRate($(".tempo").text()/cur_tempo);
				$("#back").attr("src", "image/playerback.png");
				$("#play").attr("src", "image/playerplay2.png");
				$("#pause").attr("src", "image/playerpause.png");
				$("#stop").attr("src", "image/playerstop.png");
				$(".overflow_svg").css("overflow-y", "hidden");
				Animation_Play(selected);
			}
		}
	});
	   
	function Animation_Play(index_m)
	{
		
		/*
		 * 
		 * code de scroll
		 * 
		 */	
		
		
		
		if (onglet == true)
			{
				scroll = ($("rect[id='cursor_" + current_svg + "']").attr("y"));7
				scroll = parseInt(scroll)+ 265;
				onglet = false;
			}
		 var test = ($("rect[id='cursor_" + current_svg + "']").attr("y") - 20);              
         test = test / 90;
         /*
         console.log("valeur de test/90 : " + test);
         */
		 if (($("rect[id='cursor_" + current_svg + "']").attr("y") > 20) && (test % 3 == res) && (hasScrolled == false))
		 {
			hasScrolled = true;
			ancient = $("rect[id='cursor_" + current_svg + "']").attr("y");
			console.log ("va a posiiton : " + scroll);
			$(".overflow_svg").scrollTo (scroll, 1000, {axis:'y'});
			
			scroll = scroll + 270;	
			console.log ("prochaine posiiton : " + scroll);
		 }
	
		if (ancient != ($("rect[id='cursor_" + current_svg + "']").attr("y")) && (hasScrolled == true))
		{
			hasScrolled = false;
		}
		var id = index_m + 1;
		selected = id;
		$(".progress_bar img[id='m_"+ id + "']").attr("src", "image/casebleue.png");
		id--;
		 $(".progress_bar img[id='m_"+ id + "']").attr("src", "image/casegrise.png");
		 id++;
		 if ((id >= 30) && (id % 30 == 0))
			 {
				 $(".overflow_measure").scrollTo(scroll2, 1000, {axis:'x'});
				 scroll2 += 830;
			 }
		 
		 /*
		  *
		  * fin du code de scroll
		  * 
		  */
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
	}

    $("#pause").click(function (){
        if ($(this).attr("src") == "image/playerpause.png")
        {
			javascript:document.demo.Stop();
            $("#back").attr("src", "image/playerback.png");
            $("#play").attr("src", "image/playerplay.png");
            $(this).attr("src", "image/playerpause2.png");
            $("#stop").attr("src", "image/playerstop.png");
            $($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).stop();
            $(".overflow_svg").css("overflow-y", "auto");
        }
    });

    $("#stop").click(function (){
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
    });

    /// SECTION INITIALISATION GRAPHIQUE MESURES + TRACKS

    function measure(i)
    {
        for (var j = 0; j <= i; j++)
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
		$(".instruments").empty();
        for (var i = 0; i < instruments.length;i++)
        {
            if (i == 0)
            {
                $(".instruments").prepend("<div id='t_"+i+"' class='onglets onglets_selected float-right'>" + instruments[i]._name_instrument + "</div>");
            }
            else
            {
                $(".instruments").prepend("<div id='t_"+i+"' class='onglets float-right'>" + instruments[i]._name_instrument + "</div>");
            }
        }
        $(".instruments").append("<section class='clear'></section>");
    }

    /// SECTION EVENT MESURES + TRACKS SELECTION




    $(".onglets").click(function(){
		// deselectionner l'onglet selectionné
		$(".onglets_selected")
			.removeClass('onglets_selected')
		// sélectionner l'onglet sur lequel on a cliqué
		$(this)
			.addClass('onglets_selected')

        var id = $(this).attr("id");
        var array = id.split('_');
        $(".tab_svg #"+current_svg).css("display", "none");
        var y = $($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).attr("y");
        var transform = $($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).attr("transform");
        current_svg = array[1];
        $($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).attr("y", y);
        $($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).attr("transform", transform);
        $(".tab_svg #"+current_svg).css("display", "block");
        
        /*
         * 
         * morceau de code pour le scroll au changement d'onglet
         * 
         */
       
        var newscroll = $($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).attr("y");
        onglet = true;
        res = (((newscroll - 20) / 90) % 3);
        hasScrolled = true;
        ancient = newscroll;
        $(".overflow_svg").scrollTo(newscroll-15, 1000, {axis:"y"});
        
        /*
         *
         *Fin du code de scroll
         *
         **/
    });
	var scrollTop = 0;
	var lastScroll = 0;
	$(".instruments").scroll(function(e){
		var self = $(this);
		if (e.timeStamp - lastScroll > 100) {
			lastScroll = e.timeStamp;
			var scrollTopTmp = self.scrollTop();
			if (scrollTop > scrollTopTmp) {
				scrollTopTmp = scrollTop - 30;
			} else {
				scrollTopTmp = scrollTop + 30;
			}
			self.scrollTop(scrollTopTmp);
			scrollTop = scrollTopTmp;
		} else {
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
			document.demo.SetVolume(Math.floor(ui.value*1.27));
			if (ui.value == 0){
				if (!$("#speaker").hasClass("speakoff")){
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
		if (ismute){
			$("#speaker").removeClass("speakon").addClass("speakoff");
		}
		else
		{
			$("#speaker").removeClass("speakoff").addClass("speakon");
		}
	});
	
	console.log('event');
}