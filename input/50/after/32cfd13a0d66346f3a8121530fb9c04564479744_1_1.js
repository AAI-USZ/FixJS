function(feedUrl,callback)
	{
		var data = "s=feed/"+feedUrl
					+"&T="+GoogleReader.api_token;
		this.postData(this.MARK_ALL_READ_URL + "?client="+GoogleReader.client,data,callback);
	}