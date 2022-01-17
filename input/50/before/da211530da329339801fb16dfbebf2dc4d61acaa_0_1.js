function addEventListeners() {
			// window event
			$(window).resize(callbacks.windowResize);

			// GUI events
			$(".palette-set a").click(callbacks.guiClick);
			$(".palette-set a.default").trigger('click');
		}