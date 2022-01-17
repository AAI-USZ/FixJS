function () {
			if (!this.settings.enable &&
				typeof this.settings.enable !== 'undefined') {
				return;
			}

			var that = this;
			this._visible = false;
            this._toolbar = $('<div>', {'class': 'aloha-ribbon-toolbar ui-menubar ui-widget-header ui-helper-clearfix'});

			var fadeIn = Utils.makeButtonElement({'class': 'aloha-ribbon-in'})
				.button()
				.hide()
				.click(function () {
					that._toolbar.animate({
						'left': 0
					});
					$('body').animate({marginTop: 30});
					fadeIn.hide();
				})
			    .appendTo(this._toolbar);

			var fadeOut = Utils.makeButtonElement({'class': 'aloha-ribbon-out'})
				.button()
				.click(function () {
					that._toolbar.animate({
						'left': -that._toolbar.outerWidth()
						        + fadeIn.outerWidth()
						        + 10
					});
					$('body').animate({marginTop: 0});
					fadeIn.show();
				})
				.appendTo(this._toolbar);

			var wrapper = $('<div>', {'class': 'aloha aloha-ribbon'})
				.appendTo('body');

			this._icon = $('<div>').prependTo(this._toolbar);
			this.setIcon('');

			this._toolbar.appendTo(wrapper);

			$('body').css({
				position: 'relative',
				paddingTop: 30
			});
		}