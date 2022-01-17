function () {
		var layer = $.extend({}, self.activeLayer());

		// deref themes
		
		$.each(layer.themes(), function (index, theme) {
			theme.layers.push(layer);
		});

		layer.themes = $.map(self.activeLayer().themes(), function (theme) {
			console.dir(theme);
			return theme.id;
		});
		$('.layer-modal').modal('hide');
		debugger;
		$.ajax({
		  type: 'POST',
		  url: '//data-viewer/layer',
		  data: ko.toJS(layer),
		  success: function () {
		  	debugger;
		  },
		  error: function () {
		  	debugger;
		  }
		});
	}