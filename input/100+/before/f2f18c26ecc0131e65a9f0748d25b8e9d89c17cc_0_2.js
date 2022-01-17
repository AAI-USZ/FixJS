function selectOutlineRow(outlineRow)
		{
			var rowId = $(outlineRow).attr("id");
			var hadSelection = $(outlineRow).hasClass("outlineRowSelected");
			removeOutlineRowSelection(outlineRow);
			var docToLoad; 
			if (!hadSelection)
			{
				// load the selected outline
				$(outlineRow).addClass("outlineRowSelected");
				//alert(rowId);									
				docToLoad = fetchOutline(rowId);
			} 
			else
			{
				// load a blank outline
				docToLoad = createBlankOutline("chiasm");
			}
			
			if ($(outlineRow).hasClass("outlineRowSelected"))
				installOutlineRowOptions(outlineRow);
			
			if (docToLoad)
				loadJSONToOutline(docToLoad);
		}