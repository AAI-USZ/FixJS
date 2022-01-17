function() {
			var args = arguments;
			if (args[0] == 'once') {
				if (this.options.once == false) {
					this.options.once = true;
					var options = $.extend({}, $.tk._defaultOnce, args[1]);
					this.option(options);
				}
				return;
			}
			if (args[0] == 'width' || args[0] == 'height') {
				if (args[1].indexOf('%', 0) == (args[1].length - 1) && args[1].length > 1) {
					var percent = parseInt(args[1]);
					if (percent < 0) percent = 0;
					if (percent > 100) percent = 100;
					
					var maxValue = args[0] == 'width' ? $(window).width() : $(window).height();
					args[1] = maxValue / 100 * percent;
					debugger;
				}
			}
			
			$.ui.dialog.prototype._setOption.apply(this, args);
			
			$(this.refreshButton).toggle(this.options.url !== null);
			$(this.shareButton).toggle(this.options.url !== null);
		}