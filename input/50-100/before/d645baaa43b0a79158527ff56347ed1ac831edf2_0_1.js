function(requestOptions, callback, data)
{
	var request = this.createRequest(requestOptions, data, callback);
	var stringData = JSON.stringify(data);
    
	if (this.logLevel === 'verbose' && stringData != "{}")
	{
		this.log(colors.brown + "DATA\t\t " + colors.reset + stringData);
	}

	request.write(stringData);
	request.end();
}