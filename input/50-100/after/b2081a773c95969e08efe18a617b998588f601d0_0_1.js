function () {
		// move some elements
		$('.oauth2state.unauthorized>.tryout').append($('.navheader,.calendar,.icebox'));
		$('.oauth2state.unauthorized').append($('.dialogs'));

		$('.oauth2state:not(.unauthorized)').remove();
		$('.oauth2state').show();
		$('.login a').attr('href', this.getAuthorizationURL());
		ko.applyBindings(taskwalls.pagevm = new TryOutPageViewModel());
	}