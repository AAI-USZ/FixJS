function(data, idName)
	{
		if (idName == "")
		{
			data.nodes.forEach(function(d, i){d.baseID = i})
			data.links.forEach(function(d, i){d.baseID = i})
		}
		else
		{
			data.nodes.forEach(function(d, i){d.baseID = d[idName]})
			data.links.forEach(function(d, i){d.baseID = d[idName]})
		}
	}