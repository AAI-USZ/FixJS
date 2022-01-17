function UpdateTableFromConcept(concepts, newIndex, tableBodyId, count)
	{		
		/*
		 * 
		 <table id="tableViewAAB" cols="4" class="tableViewAAB">
			<tr><td>A.</td><td>This is a test</td><td>A'</td><td>a parallel</td></tr>
			<tr><td>B.</td><td>last element</td></tr>				
		</table>
		 * 
		 */
 		var newConcept = concepts[newIndex];
 		//alert(newIndex + "->" + indexAAB + " " + newConcept.content);
		var asciiMarker = IndexToAsciiMarkerABA(newIndex, count);
		var endMarker = GetEndMarkerABA(newIndex, count);
		var halfway = Math.round(count/2);
		var fFirstConceptInPair = (newIndex < halfway);
		var rowIndex = offsetFromClosestEnd(newIndex, count);
		//alert (newIndex + asciiMarker + endMarker + newConcept.content);
		//alert(view + "/" + newIndex + "/" + newConcept.content + "/" + count );
		/*
		    $(item).wrapInner("<span class='chiasmText'/>");
            $(item).addClass("level-" + chr + "-" + view);
            $(item).attr("id", "level-" + chr + "-" + (index < halfway ? 1 : 2) + "-" + view);
		    $(item).prepend("<span class='itemMarker'>"+ chr + endchar +"</span>");
		    */
		var view = "tableAAB";
		var wrappedContent = "<span class='chiasmText'>" + newConcept.content + "</span>";
		var wrappedMarker = "<span class='itemMarker'>" + asciiMarker + endMarker + "</span>";
		var css = view + getBasicViewCssId(newIndex, count);
		var id = getViewConceptId(view, newIndex, count);
		var newTableData = "<td>" + wrappedMarker + "</td>" + 
			"<td id='" + id + "' class='" + css + "'>" + wrappedContent + "</td>";
		if (fFirstConceptInPair)
		{
			$(tableBodyId).insertAt(rowIndex, "<tr>" + newTableData + "</tr>");
		}
		else
		{
			$(tableBodyId).children().eq(rowIndex).append(newTableData);
		}
		
		//$("#" + id).hover(highlightItem, removeHighlight);
	    $("#" + id).click(highlightItem);	
		//var newItem = $(view).find("tr:eq(" + newIndex + ")");
		//return newItem;
	}