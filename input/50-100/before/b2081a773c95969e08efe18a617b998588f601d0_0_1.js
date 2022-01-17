function () {
		// copy some elements for try-out
		$('.oauth2state.unauthorized>.tryout').append($('.navheader,.calendar,.icebox,.dialogs'));
		$('.oauth2state:not(.unauthorized)').remove();
		$('.oauth2state').show();
		$('.login a').attr('href', this.getAuthorizationURL());
		ko.applyBindings(taskwalls.pagevm = new TryOutPageViewModel());
	}