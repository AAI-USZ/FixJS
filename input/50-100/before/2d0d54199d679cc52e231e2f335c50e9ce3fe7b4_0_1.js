function(xhr)
	{
		var response = JSON.decode(xhr.responseText)

		if (response && response.errors)
		{
			this.alert(response.errors, 'error')
		}

		this.fireEvent('failure', arguments)
	}