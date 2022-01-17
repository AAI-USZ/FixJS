function() {

		while ($(this.content).firstChild) {

			$(this.content).removeChild($(this.content).firstChild);

		}

		$("#" + this.content).html('');

	}