function (continuation) {

		$.gritter.add({

			// (string | mandatory) the heading of the notification

			title: 'Error!',

			// (string | mandatory) the text inside the notification

			text: 'This will fade out after a certain amount of time. '

		});

		$('.waitContainer').hide();

	}