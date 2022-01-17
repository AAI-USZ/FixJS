function() {
			var content_template = TapAPI.templateManager.get('tour-list');

			$(":jqmData(role='content')", this.$el).append(content_template);

			// iterate through all of the tour models to setup new views
			_.each(this.model.models, function(tour) {
					$('#tour-list', this.$el).append(new TapAPI.views.TourListItem({model: tour}).render().el);
			}, this);
			$('#tour-list').listview('refresh'); // refresh listview since we generated the data dynamically

		}