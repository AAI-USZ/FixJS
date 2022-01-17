function(e){ // key pressed
		$('title').html(title+'Listening...'); // listening to input
		if(e.which == 13){ // command issued with enter	
			$('title').html(title+'Running...'); // running command
			$('#joshua').css('cursor', 'wait');
			var dump = $(this).val(), // grab the input
			input = dump.split(' '), // split the input
			command = input[0],	option = input[1]; // command (option)
			_gaq.push(['_trackPageview', '/'+command]); // track as a page view in analytics
			// store history
			if(command){
				hist.push(dump);
				hist.unique();
				position = hist.length;
			}
			// js commands
			if(command == "clear" || command == "cls") clearScreen();
			else if(command == "exit" || input == "quit" || input == "logout") window.location = "http://binaerpilot.no";
			// rachael
			else if(command == "rachael"){
				var current = new Date();
				var currentYear = current.getFullYear();
				var birthday = new Date(currentYear, 6-1, 29);
				var married = new Date(2009, 10-1, 7);
				if(current > birthday) birthday = new Date(currentYear+1, 6-1, 29);
				$('#output').append('<div class="output"><div class="prompt">rachael</div><p>Rachael is the most beautiful girl in the world. It\'s a scientific fact. Yes, I am a scientist. We\'ve been happily married for <span class="countdown married light"/>, her birthday is in <span class="countdown birthday light"/> and I am still madly in love. You can <a href="http://rachaelivy.com">visit her homepage</a> if you\'d like to know more. (Potential stalkers be warned: I carry an axe.)</p></div>');
				$('.birthday').countdown({until: birthday, compact: true, format: 'OWDHMS'});
				$('.married').countdown({since: married, compact: true, format: 'OWDHMS'});
				scrollCheck();
				systemReady();
			}
			/* quit smoking
			else if(command == "smoking"){
				var quit = new Date(2010, 10-1, 1, 13, 37);
				$('#output').append('<div class="output"><div class="prompt">smoking</div><p>After having this nasty habit for 13 years, I\'ve been smoke free for <span class="countdown smoking light"/>. Huzzah!</p></div>');
				$('.smoking').countdown({since: quit, compact: true, format: 'OWDHMS'});
				scrollCheck();
				systemReady();
			} */
			// windows
			else if(command == "customize" || command == "gallery" || command == "music"){
				createCookie(command,'true',expires);
				$('#'+command+':hidden').fadeIn(fade);
				$('#'+command+'Open').addClass('active');
				if(command == "music") {
					if(muted) mute();
				}
				systemReady();
			}
			// superplastic
			else if(command == "superplastic") loadSuperplastic();
			else if(command == "videos") loadVideos();
			else if(command == "mute") mute();
			else if(command == "reset") reset();
			// come on my droogs
			else if(command == "ultraviolence") fxInit('ultraviolence', true);
			// engine
			else {
				if(command){
					$('#loader').fadeIn(250); // loader
					var content = $('<div class="output"/>').load('joshua.php', {command: command, option: option, dump: dump}, function(){
						$('#output').append(content);
						init();
						$('#loader').fadeOut(250);
					});
				}
				else systemReady();
			}
			// clear input data
			$("#prompt").val('');
		}
		// access history
		else if(e.which == 38){
			if(position > 0){ position = position-1; }
			$(this).val(hist[position]);
		}
		else if(e.which == 40){
			if(position < hist.length){ position = position+1; }
			if(position == hist.length) $(this).val('');
			else $(this).val(hist[position]);
		}
	}