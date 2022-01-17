function () {
		if (!isLocalStorageSupported) {
			alert("Your browser is very out of date. To use Ω, please use a newer browser."); // TODO: graceful degradation
			return;
		}

		$(window).on('scroll', processScroll);
		processScroll();

		$('.flash').click(hideFlashMessages).delay(500).fadeIn().delay(8000).fadeOut();

		var projectView = new ProjectView($("#nameInput"), $("#messageInput"), $("#messages"), socket);
	}