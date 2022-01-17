function(host, port)
{
	this.stream = null;
	this.handlers = [];
	this.buffer = undefined;

	this.host = (host === undefined) ? DEFAULT_HOST : host;
	this.port = (port === undefined) ? DEFAULT_PORT : port;
}