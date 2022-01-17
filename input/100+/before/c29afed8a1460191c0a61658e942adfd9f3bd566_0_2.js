function(requestOptions, data, callback)
{
	if (typeof data == "function")
	{
		callback = data;
		data = "";
	}
	
	var fullRequestOptions = this.createOptions(requestOptions);

    this.log(colors.violet + "COMMAND\t" + colors.reset + fullRequestOptions.method, fullRequestOptions.path);
	
	fullRequestOptions.headers = {
		'content-type': 'application/json',
		'charset': 'charset=UTF-8'
	}
	
	// we need to set the requests content-length. either from the data that is sent or 0 if nothing is sent
	if (data != "")
	{
		fullRequestOptions.headers['content-length'] = JSON.stringify(data).length;
	}
	else
	{
		fullRequestOptions.headers['content-length'] = 0;
	}
	
	var request = http.request(fullRequestOptions, callback);
	
	var self = this;
	request.on("error", function(err)
	{
        self.log(colors.red + "ERROR ON REQUEST" + colors.reset);
        console.log(colors.red, err, colors.reset);
	});

	return request;
}