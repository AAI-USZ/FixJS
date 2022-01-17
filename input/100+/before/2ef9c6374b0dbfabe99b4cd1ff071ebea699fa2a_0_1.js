function(context) {
		var result = '';
		$.ajax(context.action, {
			method: context.method,
			data: context.query,
			dataType: 'HTML',
			cache: false,
			success: function(html) {
				context.onSuccess(html);
				result = html;
			},
			error: function(ex, type, message) {
				result = {ex: ex, type: type, message: message};
				context.onError(message);
			},
			complete: function() {
				context.onComplete(result);
			}
		});
	}