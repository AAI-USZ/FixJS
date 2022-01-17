function(how)
{
	if ((this.body === undefined) || (this.body === null))
		return;

	var expectedLength = parseInt(this.args[this.args.length - 1], 10);
	if (Buffer.byteLength(this.body) === (expectedLength + 2))
	{
		this.args.pop();
		var body = this.body.substr(0, expectedLength);
		this.complete = true;
	
		switch(how)
		{
			case 'yaml':
				this.args.push(yaml.load(body));
				break;

			case 'passthrough':
			default:
				this.args.push(body);
				break;
		}
	}
}