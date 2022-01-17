function ($, ProjectView) {

	var project = location.pathname.match(/project\/([^\/]+)/)[1];
	var socket = io.connect('/' + project); // would love to push this into module, but causes odd race condition in some browsers

	$(function () {
		if (!isLocalStorageSupported) {
			alert("Your browser is very out of date. To use Ω, please use a newer browser."); // TODO: graceful degradation
			return;
		}

		$(window).on('scroll', processScroll);
		processScroll();

		$('.flash').click(hideFlashMessages).delay(500).fadeIn().delay(8000).fadeOut();

		var projectView = new ProjectView($("#nameInput"), $("#messageInput"), $("#messages"), socket);
	});

	function hideFlashMessages() {
		$(this).fadeOut();
	}

	function isLocalStorageSupported() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	}

	var $fixable = $('#form');
	var topOffset = $fixable.offset().top;
	var isFixed = false;
	function processScroll() {
		var scrollTop = $(window).scrollTop();
		if (!isFixed && scrollTop >= topOffset) {
			isFixed = true;
			$fixable.addClass('fixed');
		} else if (isFixed && scrollTop <= topOffset) {
			isFixed = false;
			$fixable.removeClass('fixed');
		}
	}

}