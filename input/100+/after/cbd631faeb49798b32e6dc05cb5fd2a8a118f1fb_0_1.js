function request(url)
	{
		
		try
		{
			xhr.onreadystatechange = processResponse;
			
			xhr.onerror = function(error)
			{
				console.debug("<quorum> [error] " + error);
			}
			
			var bustCache;
			
			if(url.indexOf("?") == -1)
			{
				
				bustCache = "?bustCache=" + Math.random();
			}
			else
			{
				bustCache = "&bustCache=" + Math.random();
			}

			url += bustCache;
			xhr.open("GET", url, false); 
			xhr.send(null);
		}
		catch(e)
		{
			console.error("<quorum> [error] " + error);
		}
	}