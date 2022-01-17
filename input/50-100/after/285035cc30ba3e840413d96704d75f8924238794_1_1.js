function(e) {

			if ( e.keyCode !== 13 ){
				return;
			}

			if ( !this.input.val().trim() ){
				return;
			}

			window.app.Todos.create(this.newAttributes());
			this.input.val('');
		}