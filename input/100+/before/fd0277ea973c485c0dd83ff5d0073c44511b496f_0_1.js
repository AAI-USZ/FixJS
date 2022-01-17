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
		 
		if ((selected >= 30) && (selected % 30 == 0) && vertic == false)
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