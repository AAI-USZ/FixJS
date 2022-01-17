function fetchData()
	{
		if(timer_on)
		{
			// fetch data 
			//request("http://api.quora.com/api/logged_in_user?fields=inbox,notifs");
			request("synthetic.json");
			setTimeout(fetchData, POLLING_FREQUENCY)
		}
	}