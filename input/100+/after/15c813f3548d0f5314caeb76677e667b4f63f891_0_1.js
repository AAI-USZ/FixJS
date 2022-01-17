function() {
			var completed = Todos.completed().length;
			var remaining = Todos.remaining().length;

			if (Todos.length) {
				this.$main.show();
				this.$footer.show();

				this.$footer.html(this.statsTemplate({
							completed:       completed,
							remaining:  remaining
				}));
		
			} else {
				this.$main.hide();
				this.$footer.hide();
			}

			this.allCheckbox.checked = !remaining;
		}