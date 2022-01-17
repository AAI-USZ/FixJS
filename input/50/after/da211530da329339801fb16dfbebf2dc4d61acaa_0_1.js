function addEventListeners() {
			// window event
			$(window).resize(callbacks.windowResize);

			// GUI events
			$(".palette-set a").click(sidePanelController.onClick);
			$(".palette-set a.default").trigger('click');
		}