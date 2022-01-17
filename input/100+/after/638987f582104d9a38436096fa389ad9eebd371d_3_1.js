function () {
			if (this.settings.objectTypeFilter) {
				this.objectTypeFilter = this.settings.objectTypeFilter;
			}
			if (this.settings.flags === 'true' || this.settings.flags === true || this.settings.flags === '1' || this.settings.flags === 1) {
				this.flags = true;
			} else {
				this.flags = false;
			}
			if (this.settings.iso639) {
				this.iso639 = this.settings.iso639;
			}

			this.createButtons();
			this.subscribeEvents();
			this.bindInteractions();
		}