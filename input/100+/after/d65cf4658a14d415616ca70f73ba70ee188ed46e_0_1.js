function(content, property_name)
	{	    
	    property_name += "：";
	    var key = "<p>"+property_name;
	    var start_index = content.indexOf(key);
	    if (start_index == (-1))
	    {
	        key = "<li>"+property_name;
	        start_index = content.indexOf(key);
	    }
	    if (start_index == (-1))
	        return null;
	    start_index += key.length;
	    var end_index = content.indexOf("<", start_index);
	    var value_string = content.substring(start_index, end_index);
	    return parseFloat(value_string);
	}