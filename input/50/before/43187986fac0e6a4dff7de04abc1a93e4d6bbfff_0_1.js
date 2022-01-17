function (ui) {
			var $el = $(ui);
			if ($el.is('a')) {
				this.href = ui.href;
			}
		}