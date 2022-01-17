function( items_html ) {
		return Ember.CollectionView.extend({
			contentBinding: 'controller',
			tagName: 'ul',
			elementId: 'todo-list',
			itemViewClass: Ember.View.extend({
				template: Ember.Handlebars.compile( items_html ),
				classNames: [ 'view' ],
				classNameBindings: ['content.completed', 'content.editing'],
				doubleClick: function() {
					this.get( 'content' ).set( 'editing', true );
				},
				removeItem: function() {
					this.get( 'controller' ).removeObject( this.get( 'content' ) );
				},
				ItemEditorView: Ember.TextField.extend({
					valueBinding: 'content.title',
					classNames: [ 'edit' ],
					change: function() {
						if ( Ember.empty( this.getPath( 'content.title' ) ) ) {
							this.get( 'controller' ).removeObject( this.get( 'content' ) );
						}
					},
					whenDone: function() {
						this.get( 'content' ).set( 'editing', false );
					},
					focusOut: function() {
						this.whenDone();
					},
					didInsertElement: function() {
						this.$().focus();
					},
					insertNewline: function() {
						this.whenDone();
					}
				})
			}),


		})
	}