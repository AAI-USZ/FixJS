function () {

		goToPage(currentPage + 1);

		that.callbacks("onPrev");
		that.trigger("prev");

		return that;
	}