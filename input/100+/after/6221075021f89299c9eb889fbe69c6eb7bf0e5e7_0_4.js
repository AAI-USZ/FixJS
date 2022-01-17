function() {
			var me = this, el = this.$element
			this.$element.on('blur', $.proxy(this.blur, this)).on('keypress',
					$.proxy(this.keypress, this)).on('keyup focus',
					$.proxy(this.keyup, this)).on('keyup blur', function() {
				if (el.val() == '' || el.val() == el.attr('placeholder')) {
					console.log(190, el.val())
					$('.search-clear', me.$container).addClass('hidden')

				} else {
					$('.search-clear', me.$container).removeClass('hidden')
				}
			})

			if ($.browser.webkit || $.browser.msie) {
				this.$element.on('keydown', $.proxy(this.keypress, this))
			}

			this.$menu.on('click', $.proxy(this.click, this)).on('mouseenter',
					'li', $.proxy(this.mouseenter, this))
		}