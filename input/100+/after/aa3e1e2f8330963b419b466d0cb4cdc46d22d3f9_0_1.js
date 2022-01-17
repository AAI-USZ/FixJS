function() {

	// ----------- initialization section
	// do we support this browser/os?
	// if (BrowserDetect.browser != 'Chrome' && BrowserDetect.browser != 'Firefox'
	if (!(BrowserDetect.browser == 'Chrome' || 
		BrowserDetect.OS == 'Mac' || BrowserDetect.OS != 'Windows')) {

		$('#browsermessage').fadeIn(1000);

	} else {

		var extraKeys = {};
		var gistId;
		aigua.key = {};

		// setup the key correctly (linux/windows)
		if (BrowserDetect.OS == 'Mac') {
			aigua.key.Name = 'Alt-Alt';
			aigua.key.DisplayName = 'Alt';
			aigua.key.Code = 18;
		}
		
		if (BrowserDetect.OS == 'Linux') {
			aigua.key.Name = 'Ctrl';
			aigua.key.DisplayName = 'Ctrl';
			aigua.key.Code = 17;
		}
		
		if (BrowserDetect.OS == 'Windows') {
			aigua.key.Name = 'Ctrl-Ctrl';
			aigua.key.DisplayName = 'Ctrl';
			aigua.key.Code = 17;
		}

		$('#message .key').text(aigua.key.DisplayName);
		
		{extraKeys[aigua.key.Name] = aigua.respondToKey};

		// set various dom elements
		aigua.ball = $('#ball');
		aigua.bar = $('#bar');
		aigua.filler = $('#filler');
		aigua.handle = $('#handle');
		aigua.marker = $('#marker');
		aigua.slider = $('#slider');
		aigua.triangle = $('#triangle');

		// set the handle's default width
		aigua.handle.width(aigua.startingBarWidth);

		// set the bar's border width and default width
		aigua.bar.css('border-width', aigua.borderWidth);
		aigua.bar.width(aigua.startingBarWidth);

		// set the triangle
		aigua.triangle.css('border-width', aigua.triangleHeight + 'px ' + aigua.triangleWidth + 'px 0px ' + aigua.triangleWidth + 'px');

		// create codemirror instance
		aigua.codeMirror = CodeMirror($('#code').get(0), {

			onChange: function(cm, e) {
				if (!aigua.pause) {

					if (!aigua.isLoading) {
						aigua.setToDirty();
					}

					aigua.renderCode();
				}
			},

			extraKeys: extraKeys,
			lineNumbers: true,
			matchBrackets: true,
			mode:  'javascript',
			modeURL: '/mode/%N.js',
			readOnly: false,
			theme: 'lesser-dark'
		});

		gistId = aigua.getUrlGistId(location.href);
		if (gistId) {
			aigua.loadGist(gistId);
			$('#main').fadeIn(1000);
		} else {
			aigua.loadGist($("#menu .item h2:contains('examples') + ul li:first").attr('rel'));
			$('#main').fadeIn(1000);
		}

		// pulse numbers and show instructions
	 	aigua.pulseNumbers = true;
		$('#message').show();
		aigua.pulse = setInterval(function() {
			$('#message').animate({opacity: 0.5}).animate({opacity: 1});
			$('.cm-number').animate({opacity: 0.5}).animate({opacity: 1});
		}, 1000);

		// initialize slider
		aigua.handle.draggable({

			axis: 'x',
			
			drag: function(ui, event) {

				var position = event.position.left + aigua.handle.width()/2;
				var markerCenter = aigua.marker.offset().left;
				var offset = position - markerCenter;
				var newNumber;

				// calculate the new number based on the original number
				// plus the dragging offset
				newNumber = aigua.modifyNumber(aigua.originalNumber, offset);

				// replace the selection with the new number
				aigua.codeMirror.replaceSelection(String(newNumber));

				// is the dragging cursor to the right of the marker?
				if (offset > 0) {

					// if the left bar got stuck, reset the bar width and position
					if (markerCenter - aigua.bar.offset().left - aigua.borderWidth > aigua.startingBarWidth/2) {
						aigua.resetBar(markerCenter);
					}

					// set the filler width and position
					aigua.filler.width(offset);
					aigua.filler.css('left', aigua.startingBarWidth/2);

					// are we dragging past the initial bar width?
					if (offset > aigua.startingBarWidth/2 - 6) {

						// set bar right edge to dragging position
						aigua.bar.width(position - aigua.bar.offset().left + 5);
					}

					// reset the width, since fast drags won't trigger a drag call every pixel.
					else {
						aigua.resetBar(markerCenter);

						// show the ball
						aigua.ball.show();
					}

				// is the dragging cursor to the left of the marker?
				} else if (offset < 0) {

					// set the filler width
					aigua.filler.width(-offset);

					// adjust the filler position
					aigua.filler.css('left', aigua.startingBarWidth/2 - -offset + aigua.borderWidth/2);

					// are we dragging past the initial bar width?
					if (-offset > aigua.startingBarWidth/2 - 6) {

						// adjust the filler position
						aigua.filler.css('left', aigua.borderWidth/2 + 7);

						// set bar left edge to dragging position
						aigua.bar.width(-offset + aigua.startingBarWidth/2 + 7);
						aigua.bar.css('left', position - aigua.borderWidth - 7);
					}

					// reset the width, since fast drags won't trigger a drag call every pixel.
					else {
						aigua.resetBar(markerCenter);

						// show the ball
						aigua.ball.show();
					}

				// are we at the middle?
				} else {
					aigua.filler.width(0);
				}
			}
		});

		// populate mode switcher
		_.each(aigua.modes, function(mode, index) {

			var div = $("<div class='item'></div>");
			var h2 = $("<h2></h2>");
			div.append(h2);

			h2.attr('class', index == aigua.currentModeIndex ? 'active' : 'passive');
			h2.text(mode.name);

			$('#modes').append(div);
		});


		// ----------- event handlers section

		// if we mouseup, and the slider is showing, AND nothing is selected
		// select the previously selected token
		$(window).mouseup(function(e) {

			if (aigua.slider.is(':visible') && aigua.codeMirror.getSelection() == '') {
				aigua.codeMirror.setSelection(aigua.currentSelectionStart, aigua.currentSelectionEnd);
			}

		});


		// did we keyup the handle key?
		$(window).keyup(function(e) {

			if (e.which == aigua.key.Code) {

				// hide the slider
				aigua.slider.hide();

				// reset filler width
				aigua.filler.width(0);

				// reset bar width
				aigua.bar.width(aigua.startingBarWidth);

				// clear out the original number
				aigua.originalNumber = null;
			}
		});

		// force svg contents to occupy the entire svg container
		// by rerendering code on window resize
		$(window).on('resize', function() {
			aigua.renderCode();
		});

		// handle modes switcher
		$('#modes .item h2').on('click', function(e) {
			aigua.switchMode($(this).text());
		});

		// handle menu mouseover/mouseout events
		$('#menu .item h2').on('mouseover', function(e) {
			var item = $(this).parents('.item');

			$('ul', item).show(); // show this dropdown
			$(this).addClass('hover'); // add hover class to this h2
		});

		// handle menu mouseover/mouseout events
		$('#menu .item').on('mouseout', function(e) {

			if ($(e.toElement).parents('.item').get(0) != $(this).get(0)) {
				aigua.resetMenu();
			}
		});

		// handle menu mouseover/mouseout events
		$('#menu .item li').on('mouseover', function(e) {
			var li = $(this);

			if (li.attr('class') && li.attr('class').indexOf('disabled') != -1) {

			} else {
				li.addClass('hover');
			}
		});

		// handle menu mouseover/mouseout events
		$('#menu .item li').on('mouseout', function(e) {
			$(this).removeClass('hover');
		});

		// handle clicking on title
		$('#header').on('click', function(e) {

			e.preventDefault();

			aigua.askBeforeNew();
		});

		// handle menu item choices
		$('#menu .item ul li').on('click', function(e) {
			e.preventDefault();

			var choice = $(this);
			var itemName = $('h2', choice.parents('.item')).text();
			var result;
			var postData;
			var js;
			var css;
			var a;
			
			switch(itemName) {
				case 'file':
					switch (choice.text()) {
						case 'new':
							aigua.askBeforeNew();
						break;

						case 'savewhat is this?':
							result = confirm('Login to GitHub to save your work under your username.');
							if (result) {
								open('/github-login', 'popup', 'width=1015,height=500');
							}
						break;

						case 'save anonymously':

							if (aigua.modes[aigua.currentModeIndex].name == 'javascript') {

								js = aigua.codeMirror.getValue();
								aigua.switchMode('css', true);
								css = aigua.codeMirror.getValue();
								aigua.switchMode('javascript', true);

							} else {

								css = aigua.codeMirror.getValue();
								aigua.switchMode('javascript', true);
								js = aigua.codeMirror.getValue();
								aigua.switchMode('css', true);

							}

							postData = {
								'css': css,
								'js': js
							};

							$.post('/save-anonymously', postData, function(data) {

								a = document.createElement('a');
								a.href = data;
								aigua.setUrl(a.pathname.split('/')[1]);
								aigua.setToClean();
							});

							aigua.resetMenu();
						break;
					}
				break;

				case 'examples':
					result = aigua.isDirty() ? confirm(aigua.areYouSureText) : true;
					if (result) {
						aigua.loadGist($(this).attr('rel'));
					}
				break;
			}
		});
	}

}