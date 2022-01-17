function() {
			var me = this
			var activeLi = this.$menu.find('.active')
			var val = activeLi.attr('data-value')
			var dataId = activeLi.attr('data-id')
			var dataType = activeLi.attr('data-type')

			this.$element.val(this.updater(val)).change()

			var search = this.$container
			$('.search-clear', search).addClass('hidden')
			var similar = $('span[data-type=' + dataType + ']', search)
			if (similar.length) {
				similar.attr('data-value', val).attr('data-id', dataId).attr(
						'data-type', dataType)
				$('.jlabel-inner', similar).text(val)
			} else {
				var addOn = $.jString.format(this.$addOn, val, dataId,
						dataType, 'icon-user')
				search.find('.query-params').append(addOn)

				$('.query-item-clear', search).unbind('click').click(
						function() {
							$(this).parent().remove();
							me.adjust()
						})
			}
			this.adjust()
			this.$element.val('')// .change()

			// form record
			var record = {}
			$('.query-item-label', search).each(function() {
				var label = $(this)
				record[label.attr('data-type')] = label.attr('data-id')
			})
			$.jForm.loadRecord($(this.targetForm), record)

			console.log(record)
			return this.hide()
		}