function() {
			var search = this.$container
			var offsetX = parseInt(search.find('.query-params').css('width'))

			search.find('.query-input').css({
				marginLeft : offsetX + 'px'
			})
			console.log(offsetX + 'px')

			var inputWidth = parseInt(search.css('width')) - offsetX - 30
					+ 'px'
			search.find('.query-input').css({
				width : inputWidth
			})
			this.$element.css({
				width : inputWidth
			})

			$('ul.search.dropdown-menu').css({
				width : inputWidth
			})
			console.log(97, $('ul.search.dropdown-menu').css('width'))
		}