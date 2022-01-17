function publishOutlineChangesToTableView(outline)
	{
		var rowId = outline._id;
    	var newRow = {"id" : rowId, "key" : [rowId, 1], "value" : outline};
    	var getResponse = getDb();
    	if (!replaceRow(getResponse.rows, newRow.id, newRow))
    	{
    		getResponse.rows.push(newRow);
    		getResponse.total_rows += 1;
    	}			    	
    	cacheDbInDom(getResponse);
    	LoadPersonsAndAuthoredOutlines();
    	var newRow = pageToRow(jq("exampleTable"), jq(outline._id));
    	selectOutlineRow(newRow);
    	alert("Changes have been published");    	
	}