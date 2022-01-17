function () {

		goToPage(currentPage + 1);

		that.callbacks("onNext");
		that.trigger("next");

		return that;
	}