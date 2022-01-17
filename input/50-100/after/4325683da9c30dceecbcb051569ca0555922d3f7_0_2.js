function() {
			var remaining = 0,
				completed = this.collection.filter(function(el) {
					var status = el.get('completed') == 'completed';
					if (!status)
						remaining++;

					return status;
				}).length;

			this.footer.set('html', this.template({
				completed: completed,
				remaining: remaining
			}));

			this.toggleAll.set('checked', this.collection.length ? !remaining : false);

		}