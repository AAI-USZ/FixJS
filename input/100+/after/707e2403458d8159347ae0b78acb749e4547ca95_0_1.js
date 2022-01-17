function(xml)
	{
		if (DESK.isError(xml))
		{
			alert(DESK.getError(xml));
			return ;
		}
		var table = document.createElement("table"); // table for results
		table.border=0;
		table.width="100%";
		table.className="searchList";
		
		var container = document.getElementById(DESKSearch.displayid);
		
		if (container.hasChildNodes())
		{
			while(container.childNodes.length >= 1)
				container.removeChild(container.firstChild);
		}
		
		container.appendChild(table);
		
		var meta = xml.getElementsByTagName("meta")[0];
		
		var start = parseInt(meta.getElementsByTagName("start")[0].firstChild.nodeValue);
		var limit = parseInt(meta.getElementsByTagName("limit")[0].firstChild.nodeValue);
		var count = parseInt(meta.getElementsByTagName("count")[0].firstChild.nodeValue);
		var results = xml.getElementsByTagName("entity").length;
		var keyfield = (meta.getElementsByTagName("keyfield")[0].textContent==undefined) ?
			meta.getElementsByTagName("keyfield")[0].firstChild.nodeValue : meta.getElementsByTagName("keyfield")[0].textContent ;
		
		var display = "Displaying results "+(start+1)+" to "+(start+results)+" of "+count;
		var dispdivtop = document.createElement("div");
		var dispdivbot = document.createElement("div");
		dispdivtop.innerHTML = display;
		dispdivbot.innerHTML = display;
		container.appendChild(dispdivtop);
		
		container.appendChild(table);
		
		var entities = xml.getElementsByTagName("entity");
		
		var fieldcount = 0;
		var rowcount = 0;
		var callbacknow = false;
		
		if (DESKSearch.callback != null && entities.length==1)
			callbacknow=true;
		
		for (var i=0; i<entities.length; ++i)
		{
			var keyfieldval = "";
			var entity = entities[i];
			var row = table.insertRow(table.getElementsByTagName("tr").length);
			row.className="row"+rowcount;
			if ( ++rowcount > 1)
				rowcount = 0;
			var fields = entity.getElementsByTagName("field");
			
			fieldcount=0;
			
			for (var z=0; z<fields.length; ++z)
			{
				var id = fields[z].attributes.getNamedItem("id").value;
				var cell = row.insertCell(z);
				var data = (fields[z].textContent == undefined) ? fields[z].firstChild.nodeValue : fields[z].textContent;
				if (id == keyfield)
				{
					keyfieldval = data;
					if (DESKSearch.callback != null)
					{
						data = "<a href=\"#\" onclick=\"DESKSearch.callback('"+keyfieldval+"');\">"+keyfieldval+"</a>";
						if (callbacknow)
						{
							DESKSearch.callback(keyfieldval);
							window.close();
						}
					}
				}
				cell.innerHTML = data;
				++fieldcount;
			}
			
			var edit = "<a href=\"#\" onclick=\"DESK.editEntity('"+DESKSearch.entity+"','"+keyfield+"','"+keyfieldval+"');\">Edit</a>";
			var cell = row.insertCell(-1);
			cell.innerHTML = edit;
		}
		
		var prevCell = "&nbsp;";
		
		if (start>0)
		{
			prevCell="<a href=\"#\" onclick=\"DESKSearch.search("+(start-limit)+","+limit+");\">&lt;&lt; Previous</a>";
		}
		
		var nextCell = "&nbsp;";
		
		if ( (start+limit) < count )
		{
			nextCell="<a href=\"#\" onclick=\"DESKSearch.search("+(start+limit)+","+limit+");\">&gt;&gt; Next</a>";
		}
		
		var spanWidth = fieldcount-1; // allowing for the edit
		
		var row = table.insertRow(0);
		var rowb = table.insertRow(-1);
		var cell = row.insertCell(0);
		var cellb = rowb.insertCell(0);
		cell.innerHTML = prevCell;
		cellb.innerHTML = prevCell;
		
		for (var i=0; i<spanWidth; ++i)
		{
			cell = row.insertCell(i+1);
			cellb = rowb.insertCell(i+1);
			cell.innerHTML = "&nbsp;";
			cellb.innerHTML = "&nbsp;";
		}
		cell=row.insertCell(spanWidth+1);
		cellb=rowb.insertCell(spanWidth+1);
		
		cell.innerHTML = nextCell;
		cellb.innerHTML = nextCell;
		
		container.appendChild(dispdivbot);
		
	}