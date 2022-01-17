function(args) {

			_.defaults(this.options, {
				page_title: '',
				back_label: 'Back'
			});

			if (this.onInit) {
				this.onInit();
			}
		}