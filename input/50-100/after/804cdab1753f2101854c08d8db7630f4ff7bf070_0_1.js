function(pnt, direction)
{
	this.position = new point(pnt.x, pnt.y);
	this.direction = direction;
	this.server_trace.push(new point(pnt.x, pnt.y));
	this.temp_trace = new Array();
}