function () {
		var layer = self.activeLayer(), postData = {};

		// $.each(layer.themes(), function (index, theme) {
		// 	theme.layers.push(layer);
		// });

		// deref themes
		postData = {
			themes: $.map(self.activeLayer().themes(), function (theme) {
					return theme.id;
				}),
			name: layer.name(),
			url: layer.url()
		}
		

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