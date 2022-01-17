function () {
		var layer = self.activeLayer(), postData, themes, url;

		// $.each(layer.themes(), function (index, theme) {
		// 	theme.layers.push(layer);
		// });
		if (layer.id) {
			// save existing layer
			url = '/data_viewer/layer/' + id;
		} else {
			// create new layer
			url = '/data_viewer/layer'
		}
	
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
		  url: url,
		  data: postData,
		  traditional: true,
		  success: function () {
		  	debugger;
		  },
		  error: function () {
		  	debugger;
		  }
		});
	}