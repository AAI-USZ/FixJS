function showPopup(e) {
			contador3++;
			if (hideDelayTimer) clearTimeout(hideDelayTimer);
			if (beingShown || shown) {
				// don't trigger the animation again
				return;
			} else {
				
				
				// posicion del elemento seleccionado
				var target_offset = $(this).offset();
				
				// informacion de persona y motivo de los dos periodos
				var man = {persona: $(this).data("manpers") ,motivo: $(this).data("manmsg")};
				var tar = {persona: $(this).data("tarpers") ,motivo: $(this).data("tarmsg")};
				var day = new Date($(this).data("day"));
				
				if (man.persona != undefined || tar.persona != undefined) {
				
					info.css('bottom', '')
						.css('left','');
					// reset position of info box
					beingShown = true;
					
					if (man.persona == "") {man.persona = "LIBRE"};
					if (tar.persona == "") {tar.persona = "LIBRE"};
					if (man.motivo == "") {man.motivo = "&nbsp;"};
					if (tar.motivo == "") {tar.motivo = "&nbsp;"};
					
					
					info.append('<h1>' + day.getDate() + '/' + (day.getMonth()+1) + '/' + day.getFullYear() + '</h1>')
						.append('<span style="display:inline"><h2>Mañana: </h2>')
						.append('<p><strong>Persona: </strong> ' + man.persona + '</p><p><strong>Motivo: </strong> ' + man.motivo + '</p></span>')
						//.append('<hr>')
						.append('<span><h2>Tarde: </h2>')
						.append('<p><strong>Persona: </strong> ' + tar.persona + '</p><p><strong>Motivo: </strong> ' + tar.motivo + '</p></span>');
					
					var newTop = target_offset.top - info.height() - 10;
					if (newTop < 0) {
						newTop = target_offset.top + $(this).height();
					};
					
					info.css({
						top : (newTop) + "px",
						left : (target_offset.left + ($(this).width() - info.width())/2) + "px",
						display : 'block',
						background : 'white',
						overflow : "hidden"
					}).animate({
						top : '-=' + distance + 'px',
						opacity : 1
					}, time, 'swing', function() {
						beingShown = false;
						shown = true;
					}); 

				}
			}
			e.stopPropagation();
			return false;
		
			}