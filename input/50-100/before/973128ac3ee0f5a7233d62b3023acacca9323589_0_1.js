function(file)
    {
    	var params = Url.parseURLParams(file.href);
    	var url="";
    	for(var i=0;i<params.length;i++)
    	{
    		var result = params.map(function(o) { return o.name + ": " + o.value; });
    	}
    		System.copyToClipboard(result.join("\n"));
    }