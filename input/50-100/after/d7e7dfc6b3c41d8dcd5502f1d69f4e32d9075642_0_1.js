function(url)
		{
			var viewer = this;
			$.getJSON(url, null, function(data)
			{	
				 viewer.addTracks(data);
			});
		}