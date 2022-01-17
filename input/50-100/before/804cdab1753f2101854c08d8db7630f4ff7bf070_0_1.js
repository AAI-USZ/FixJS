function(pnt, direction)
{
	this.position = pnt;
	this.direction = direction;
	this.server_trace.push(pnt);
	this.temp_trace.length = 0;
}