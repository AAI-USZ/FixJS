function () {

		(new PB.Request({

			url: this.getUrl(),
			method: this.get('id') ? 'PUT' : 'POST',
			data: {

				__data: JSON.stringify(this.data)
			}
		})).on('end', this.crudCallback, this).send();
	}