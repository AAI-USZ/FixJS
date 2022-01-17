function() {
		var m = window.location.href.match(/\/view\/([0-9]+)/);

		$.ajax({
			'type': 'GET',
			'url': '/OphCoCorrespondence/Default/confirmPrinted/'+m[1],
			'success': function(html) {
				if (html != "1") {
					alert("Sorry, something went wrong. Please try again or contact support for assistance.");
				} else {
					location.reload(true);
				}
			}
		});
	}