function (res) {
		var link = $this.prev('a'),
			newhref = link.attr('href')
				.replace(/status=\d/, 'status=' + data.status);

		link.attr('href', newhref)
			.text($this.find(':selected').text());
	}