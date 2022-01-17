function () {



	$.continuations.bind('HttpError', function (continuation) {

		var response = continuation.response;

		var message = "Unknown error";

		if (response.getResponseHeader('Content-Type').indexOf('text/html') != -1) {

			message = $(response.responseText).find('i').text();

		}

		if (response.getResponseHeader('Content-Type').indexOf('json') != -1 && continuation.errors && continuation.errors > 0) {

			message = continuation.errors[0].message;

		}



		$.gritter.add({

			title: 'Error!',

			text: message,

			class_name: 'gritter-light'

		});

		

		$('.waitContainer').hide();

	});



}