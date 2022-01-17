function( stats_html ) {
		return Ember.View.extend({
			elementId: 'todo-count',
			tagName: 'span',
			remainingBinding: 'controller.remaining',
			template: Ember.Handlebars.compile( stats_html ),
			oneLeft: function() {
				return this.get( 'remaining' ) === 1;
			}.observes( 'remaining' )
		})
	}