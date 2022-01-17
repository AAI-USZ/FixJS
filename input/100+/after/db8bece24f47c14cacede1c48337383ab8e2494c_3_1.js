function CreateChiasmViewItem(concepts, newIndex, view)
	{		
		// 0 -> 0
		// 1 -> 1
		// 2 -> 1
		// 3 -> 2
		// 4 -> 2
		// 5 -> 3
		// 6 -> 3
		var conceptsCount = concepts.length;
	    //alert(newIndex + "/" + concepts.length);
		var newConcept = concepts[newIndex];
		$("#chiasm-" + view).insertAt(newIndex, "<div>" + newConcept.content + "</div>");
		var newItem = $("#chiasm-" + view).children("div:eq(" + newIndex + ")");								

		var chr = IndexToAsciiMarkerABA(newIndex, conceptsCount);
		var endchar = GetEndMarkerABA(newIndex, conceptsCount);
		var marginLeft = CalculateMarginInPx(newIndex, conceptsCount);
		var halfway = Math.round(conceptsCount/2);		
	    if (newIndex < halfway)
	    {
	       var marginleft = "";
	       if (!CompatibilityMode && view == "indent")
	       {
	       		marginleft = "{ margin-left:" + marginLeft + "px;}";
	       }
	       		
	       $("<style type='text/css'> ." + view + getBasicViewCssId(newIndex, conceptsCount) + " " + marginleft + " </style>").appendTo("head");
		}
	  	$(newItem).wrapInner("<span class='conceptContent'/>");
        $(newItem).addClass(view + getBasicViewCssId(newIndex, conceptsCount));
        $(newItem).attr("id", getViewConceptId(view, newIndex, conceptsCount));
	    $(newItem).prepend("<span class='itemMarker'>"+ chr + endchar +"</span>");
	    if (CompatibilityMode && view == "indent")
	    {
	    	var spaces = convertIndentToSpaces(marginLeft);	    
	    	$(newItem).prepend(spaces); 	
	    }
	    //$(newItem).hover(highlightItem, removeHighlight);
	    $(newItem).click(highlightItem);	

		return newItem;
	}