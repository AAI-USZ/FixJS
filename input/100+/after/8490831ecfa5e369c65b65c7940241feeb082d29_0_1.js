function() {

				$this.remove()
				
				var markup = ui.lists.drawTasks([id])

				//If it's the first task in a list, .prev won't work
				if (orig === undefined) {
					if (ui.session.selected == 'all' || ui.session.selected == 'logbook' || ui.session.selected == 'today') {
						$tasks.find('ul').prepend(markup)
					} else if (model.list == ui.session.selected) {
						$tasks.find('ul').first().prepend(markup)
					} else {
						$tasks.find('ul.' + model.list).prepend(markup)
					}
				} else {
					$tasks.find('ul li[data-id="' + orig + '"]').after(markup)
				}

				$tasks.find('ul li[data-id="' + id + '"]').trigger('collapse')

				if(typeof cb === 'function') cb()

				// after a task has changed, reload the list to re-sort
				$sidebar.find('.selected .name').click()
				
			}