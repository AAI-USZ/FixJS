function(ev) {

		if (ev.which==keyDown) {

			//console.log('ignore duplicate keydown for '+ev.which);

			ev.stopPropagation();

			return false;

		}

		keyDown = ev.which;

		// Note: this is not meant to be called multiple times when key is held down, but on Chrome

		// it is being, so that will need some filtering

		console.log('keydown: '+ev.which+' ctrlKey='+ev.ctrlKey+' special='+isSpecialKey(ev.which));



		if (tool) {

			// switch tool

			tool.end(new paper.Point(mousePageX-keyTarget.offsetLeft, mousePageY-keyTarget.offsetTop));

			tool = undefined;

			redraw(paper);

		}

		keyTarget = mouseTarget;

		var v = getView(keyTarget);

		if (v) {

			var t = tools['code'+ev.which];

			if (t) {

				console.log('begin tool '+t);

				tool = t;

				tool.begin(new paper.Point(mousePageX-keyTarget.offsetLeft, mousePageY-keyTarget.offsetTop));

				redraw(paper);

			}

		}

		

		// stop, e.g. backspace and ctrl-... propagating to browser itself

		if (isSpecialKey(ev.which) || ev.ctrlKey) {

			ev.stopPropagation();

			return false;

		}

	}