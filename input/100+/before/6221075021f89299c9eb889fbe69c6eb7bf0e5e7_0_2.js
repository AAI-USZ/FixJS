function() {
			var search = this.$container
			var offsetX = parseInt(search.find('.query-params').css('width'))

			search.find('.query-input').css({
				marginLeft : offsetX + 'px'
			})
			console.log(offsetX + 'px')

			search.find('.query-input').css({
				width : parseInt(search.css('width')) - offsetX - 30 + 'px'
			})
			this.$element.css({
				width : parseInt(search.css('width')) - offsetX - 30 + 'px'
			})
		}