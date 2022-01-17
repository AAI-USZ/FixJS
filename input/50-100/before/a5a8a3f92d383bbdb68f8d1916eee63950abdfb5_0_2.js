function () {

		(new PB.Request({

			url: this.getUrl(),
			async: false,
			method: this.get('id') ? 'PUT' : 'POST',
			data: {
				__data: JSON.stringify(this.getPostData())
			}
		})).send();
	}