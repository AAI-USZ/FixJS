function(data)
{
	var eol = data.indexOf('\r\n');
	if (eol >= 0)
	{
		// Header is everything up to the windows line break;
		// body is everything after.
		this.header = data.substr(0, eol);
		this.body = data.substr(eol + 2);
		this.args = this.header.split(' ');
		
		var response = this.args[0];
		if (response === this.expectedResponse)
		{
			this.success = true;
			this.args.shift(); // remove it as redundant
		}
		if (this.RESPONSES_REQUIRING_BODY[response])
			this.parseBody(this.RESPONSES_REQUIRING_BODY[response]);
		else
			this.complete = true;
	}
}