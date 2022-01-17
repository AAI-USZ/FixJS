function (data, textStatus, jqXHR) {

		$(core.region)

			.html(data)

			.hide()

			.fadeIn();

		

		core.adjustMagnifyingLensPosition();

		core.attachEventHandlers();



		if (enterCallBack) enterCallBack();

	}