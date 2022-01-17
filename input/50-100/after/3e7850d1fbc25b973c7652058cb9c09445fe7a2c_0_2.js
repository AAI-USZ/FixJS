function(layout) {
			var view = layout(this); //Get this view from the layout.
			this.setViews({
				".sub_on_field_area": new TrackedGame.Views.RosterList({collection: this.options.onfield, remove_all_button: true}),
				".sub_off_field_area": new TrackedGame.Views.RosterList({collection: this.options.offfield})
			});
			return view.render({ team: this.options.team});
		}