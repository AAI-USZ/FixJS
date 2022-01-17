function ()
{
	var str = '';
  
  str += "  postMessage = (typeof webkitPostMessage !== 'undefined') ? webkitPostMessage : postMessage;\n";

    for (var p in this)
	{
		if(this[p] != x3dom.BitLODWorker.prototype.toBlob)
		{
			str += 'var ' + p + ' = ';
			
			if (this[p] instanceof String) 
			{
			  str += '"' + this[p] + '"';
			}
			else if (this[p] instanceof Array)
			{
				str += "[];\n";
			}
			else 
			{
			  str += this[p] + ';\n';
			}
		}
    }
  
	
  
	var bb = new BlobBuilder();
	bb.append(str);
	
	return URL.createObjectURL(bb.getBlob());
}