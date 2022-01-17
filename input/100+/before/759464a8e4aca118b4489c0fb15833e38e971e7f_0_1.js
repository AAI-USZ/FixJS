function (continuation) {

		debugger;

		$('#errorContainer').html(continuation.errors[0].message);

		$('.waitContainer').hide();

	}