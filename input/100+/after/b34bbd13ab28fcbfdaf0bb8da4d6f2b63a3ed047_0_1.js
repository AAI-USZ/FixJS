function () {
		var layer = self.activeLayer(), postData, themes;

		// $.each(layer.themes(), function (index, theme) {
		// 	theme.layers.push(layer);
		// });

		// deref themes
		themes = $.map(layer.themes(), function (theme) {
					return theme.id;
				});

		postData = {
			themes: themes,
			name: layer.name(),
			url: layer.url()
		};

		$('.layer-modal').modal('hide');
		$.ajax({
		  type: 'POST',
		  url: '/data-viewer/layer',
		  data: postData,
		  success: function () {
		  	debugger;
		  },
		  error: function () {
		  	debugger;
		  }
		});
	}