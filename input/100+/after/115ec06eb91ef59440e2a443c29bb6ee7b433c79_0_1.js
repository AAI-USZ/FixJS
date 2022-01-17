function SCxml(source)
{
	this.dom=null
	
	this.internalQueue=[]
	this.externalQueue=[]
	
	this.configuration={}
	this.sid=++SCxml.sessionCount
	this.datamodel=new SCxml.Datamodel(this)
	SCxml.sessions[this.sid]=this
	
	this.running=false
	this.stable=false

	if(source instanceof Element)
	{
		// not really implemented
		this.interpret(source)
	}
	else
	{
		console.debug("Fetching "+source+"…")
		new XHR(source, this, this.xhrResponse, null, this.xhrFailed)
	}
}