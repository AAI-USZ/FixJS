function(xhr)
	{
		try
		{
			var response = JSON.decode(xhr.responseText)

			if (response && response.errors)
			{
				this.alert(response.errors, 'error')
			}

			if (response.exception)
			{
				alert(response.exception)
			}
		}
		catch (e) {}

		this.fireEvent('failure', arguments)
	}