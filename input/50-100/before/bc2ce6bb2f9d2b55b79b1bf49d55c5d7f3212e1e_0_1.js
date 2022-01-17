function (name, src, err)
{
	SCxml.Event.call(this, name)
	this.srcElement=src||null
	this.err=err
	if(src.tagName=="send")
		this.sendid=src.getAttribute("id")
}