function (res) {
		var link = $this.prev('a');

		link.attr('href', link.attr('href').slice(0, -1) + data.status)
			.text($this.find(':selected').text());
	}