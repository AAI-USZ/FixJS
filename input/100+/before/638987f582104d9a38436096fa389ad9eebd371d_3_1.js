function () {
			if (this.settings.objectTypeFilter) {
				this.objectTypeFilter = this.settings.objectTypeFilter;
			}

			this.createButtons();
			this.subscribeEvents();
			this.bindInteractions();
		}