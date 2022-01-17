function( items_html ) {
		return Ember.View.extend({
			template: Ember.Handlebars.compile( items_html )
		})
	}