function(event, data) {
		if (data.success === false) {
			$('dd.status').addClass('error');
			$("dd.status").text(data.message);
		} else {
			if (data.returnto !== false) {
				window.location.href = data.returnto;
			} else {
				window.location.href = 'user';
			}
		}
	}