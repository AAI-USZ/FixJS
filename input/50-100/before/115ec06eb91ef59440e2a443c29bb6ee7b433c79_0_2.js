function (target, event)
{
	console.log("sending a "+event.name+" event to "+target)
	var sid
	if((sid=target.match(/^#_scxml_(.+)$/)) && (sid=sid[1]))
	{
		if(sid in SCxml.sessions && SCxml.sessions[sid])
			SCxml.sessions[sid].onEvent(event)
		else throw "target SCXML session doesn't exist"
	}
	else {} // TODO
}