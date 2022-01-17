function( e ) {
		var fragment = Y.one( Y.config.doc.createDocumentFragment() );

		Y.Array.each( e.models, function ( model ) {
			var view = new TodoView({
				model: model
			});
			fragment.append( view.render().container );
		});

		this.container.one('#todo-list').setContent( fragment );
	}