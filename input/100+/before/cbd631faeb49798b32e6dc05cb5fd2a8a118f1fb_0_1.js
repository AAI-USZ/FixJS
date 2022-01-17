function request(url)
	{
		
		try
		{
			xhr.onreadystatechange = processResponse;
			
			xhr.onerror = function(error)
			{
				console.debug("<quorum> [error] " + error);
			}
			
			xhr.open("GET", url, true);
			xhr.send(null);
		}
		catch(e)
		{
			console.error("<quorum> [error] " + error);
		}
	}