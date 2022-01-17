function () {

		if( !this.get('id') ) {

			return;
		}

		(new PB.Request({

			url: this.getUrl(),
			method: 'DELETE'
		})).on('end', this.crudCallback, this).send();
	}