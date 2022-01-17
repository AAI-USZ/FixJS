function () {

	var token = null;

	return {

		askBeforeNew: function() {
			var result = aigua.isDirty() ? confirm(aigua.areYouSureText) : true;

			if (result) {
				aigua.resetScreen();
				aigua.resetUrl();
				aigua.resetMenu();
			}
		},

		getOAuthToken: function() {
			return token;
		},

		getUrlGistId: function(url) {

			var a = document.createElement('a');
			a.href = url;

			var gistId = a.pathname.split('/')[1];

			return (gistId.length > 0 && gistId != '!') ? gistId : null;
		},

		isDirty: function() {
			return $('.dirty').css('visibility') == 'visible';
		},

		loadGist: function(gistId) {

			aigua.isLoading = true;

			aigua.resetScreen();
			aigua.resetMenu();
			aigua.setToClean();

			$.ajax({
				url: 'https://api.github.com/gists/' + gistId + '?callback=?',
				dataType: 'json',
				success: function (data) {

					var js = data.data.files['water.js'];
					var css = data.data.files['water.css'];

					aigua.switchMode('css', true);

					if (css) {
						aigua.codeMirror.setValue(css.content);
					}

					aigua.switchMode('javascript');

					if (js) {
						aigua.codeMirror.setValue(js.content);
						aigua.codeMirror.setValue(js.content); // don't know why i have to do this twice
					}

					aigua.setUrl(gistId);

					aigua.isLoading = false;
				}
			});

		},

		// modify a number by a certain distance
		// e.g. modifyNumber(5.89, 10) = 5.89 + 10 * 0.1
		// e.g. modifyNumber(58.9, 20) = 58.9 + 20 * 1
		modifyNumber: function(number, distance) {

			var parts;
			var exponent;
			var factor;
			var result;

			// say we have a number: 5.89
			// we first calculate its exponent: 0
			parts = number.toExponential().split('e');
			exponent = Number(parts[1]);

			// next we subtract 1 from the exponent: -1
			exponent = exponent - 1;

			// then we calculate our desired factor: 10^-1 = 0.1
			factor = Math.pow(10, exponent);

			// next we modify the number by the distance
			result = number + distance * factor;

			// finally we make sure not to add rounding errors
			return Number(result.toPrecision(parts[0].replace('.', '').length));
		},

		// run the code and update the display
		renderCode: function() {

			// get the current code
			var code = aigua.codeMirror.getValue();

			try {

				switch (aigua.modes[aigua.currentModeIndex].name) {

					case 'javascript':

						// clear out the display contents
						$('svg').empty();

						// run the code
						eval(code);

					break;

					case 'css':
						$('#aiguaStyle').get(0).textContent = code;
					break;

				}

			}
			catch (error) {}
			finally {};
		},

		// reset bar position and width:
		// center bar over the token
		// set bar width to default starting width
		resetBar: function(markerCenter) {
			aigua.bar.width(aigua.startingBarWidth);
			aigua.bar.css('left', markerCenter - aigua.startingBarWidth/2 - aigua.borderWidth);
			aigua.filler.removeClass('filler-edge-left');
			aigua.filler.removeClass('filler-edge-right');
		},

		resetMenu: function() {

			var menu = $('#menu');
			$('ul', menu).hide(); // hide all the dropdowns
			$('h2', menu).removeClass('hover'); // remove hover class from all the h2's
		},

		resetScreen: function() {

			aigua.switchMode('javascript', true);
			aigua.codeMirror.setValue('');
			aigua.switchMode('css', true);
			aigua.codeMirror.setValue('');
			aigua.switchMode('javascript');

			$('svg').remove();
			$('#display').append('<svg></svg>');
		},

		resetUrl: function() {
			history.pushState(null, null, '!');
			$('#gist').attr('href', '');
			$('#gist').html('');
		},

		respondToKey: function(cm) {

			if (aigua.modes[aigua.currentModeIndex].name == 'javascript') {

				var cursor;
				var token;
				var startCoords;
				var endCoords;
				var center;

				// is the slider hidden?
				if (!aigua.slider.is(':visible')) {

					// grab the current token
					cursor = cm.getCursor();
					token = cm.getTokenAt(cursor);

					// are we on a number?
					if (token.className == 'number') {

						if (aigua.pulseNumbers) {
							// stop pulsing numbers
							window.clearInterval(aigua.pulse);
							$('#message').hide();
							aigua.pulseNumbers = false;
						}

						// show the slider
						aigua.slider.show();

						// save the original number
						if (aigua.originalNumber == null) {
							aigua.originalNumber = Number(token.string);
						}

						// select token
						aigua.currentSelectionStart = {line: cursor.line, ch: token.start};
						aigua.currentSelectionEnd   = {line: cursor.line, ch: token.end};
						cm.setSelection(aigua.currentSelectionStart, aigua.currentSelectionEnd);

						// find coords at token start
						startCoords = cm.cursorCoords(true);
						endCoords = cm.cursorCoords(false);

						// center marker on token
						center = startCoords.x + (endCoords.x - startCoords.x)/2;
						aigua.marker.css('left', center);

						// center handle on token
						aigua.handle.css('left', center - aigua.handle.width()/2);

						// center bar above token
						aigua.bar.css('left', center - aigua.bar.width()/2 - aigua.borderWidth);
						aigua.bar.css('top', startCoords.y - aigua.lineHeight);

						// center triangle on token
						aigua.triangle.css('left', center - aigua.triangleWidth);
						aigua.triangle.css('top', aigua.bar.offset().top + aigua.bar.height() + aigua.borderWidth * 2);

						aigua.ball.offset({top: aigua.filler.offset().top});
					}
				}
			}
		},

		setOAuthToken: function(oauthToken) {
			token = oauthToken;
		},

		setToClean: function() {
			$('.dirty').css('visibility', 'hidden');
		},

		setToDirty: function() {
			$('.dirty').css('visibility', 'visible');
		},

		setUrl: function(gistId) {
			history.pushState(null, null, gistId);

			var gistBaseUrl = 'https://gist.github.com/';
			gistUrl = gistBaseUrl + gistId;

			$('#gist').attr('href', gistUrl);
			$('#gist').html(gistUrl);
		},

		switchMode: function(mode, noTab) {

			aigua.pause = true;

			if (!noTab) {
				$('#modes h2').attr('class', 'passive');
				$("#modes h2:contains('" + mode + "')").attr('class', 'active');
			}

			aigua.modes[aigua.currentModeIndex].code = aigua.codeMirror.getValue();

			aigua.currentModeIndex = _.indexOf(_.pluck(aigua.modes, 'name'), mode);

			aigua.codeMirror.setValue(aigua.modes[aigua.currentModeIndex].code || '');

			aigua.codeMirror.setOption("mode", aigua.modes[aigua.currentModeIndex].name);
			CodeMirror.autoLoadMode(editor, aigua.modes[aigua.currentModeIndex].name);

			aigua.pause = false;
		},

		areYouSureText: 'Are you sure? You will lose any unsaved changes.',
		ball: null,
		bar: null,
		borderWidth: 2,
		currentModeIndex: 1,
		currentSelection: null,
		filler: null,
		handle: null,
		isLoading: null,
		key: null,
		lineHeight: 19,
		marker: null,
		modes: [
			{
				name: 'javascript',
				code: null
			}, {
				name: 'css',
				code: null
			}
		],
		originalNumber: null,
		pause: false,
		pulse: null,
		pulseNumbers: true,
		slider: null,
		startingBarWidth: 300,
		triangle: null,
		triangleHeight: 5,
		triangleWidth: 12

	}
}