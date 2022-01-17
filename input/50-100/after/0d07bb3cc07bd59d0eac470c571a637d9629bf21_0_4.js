function() {
		var val = Y.Lang.trim( this.inputNode.get('value') );

		this.container.removeClass('editing');

		if ( val ) {
			this.model.set( 'title', val ).save();
		} else {
			this.model.destroy({
				'delete': true
			});
		}
	}