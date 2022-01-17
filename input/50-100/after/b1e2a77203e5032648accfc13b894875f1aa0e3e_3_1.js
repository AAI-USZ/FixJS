function (data, textStatus, jqXHR) {

		$(core.region)

			.html(data)

			.hide()

			.fadeIn();

		

		core.adjustLensPosition();

		core.attachEventHandlers();

		if (enterCallBack) enterCallBack();

	}