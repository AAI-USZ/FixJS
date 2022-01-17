function JSONToPreviewPanel() {
		$("#tableViewAAB tr").remove();
		$("#chiasm-flat").addClass("chiasm");
		$(".chiasm div").remove();
		$(".chiasm ol").remove();  // outline
		$("#chiasm-flat").removeClass("chiasm");
		
		var combinedTitle = CombineTitleAuthorAndSource();
		updateViewsChiasmContent("-title-chiasm", combinedTitle);
		updateViewsChiasmContent("-chiasm-scriptureRange", mainOutline.head.ScriptureRange);
	
		var count = mainOutline.body.concepts.length;
		
		if (mainOutline.head.contentType == "chiasm")
		{
			$(mainOutline.body.concepts).each(function(index)
			{
				ConceptToChiasmViewItem(mainOutline.body.concepts, index, true);
		    	ConceptToChiasmViewItem(mainOutline.body.concepts, index, false);
				UpdateTableFromConcept(mainOutline.body.concepts, index, "#tableViewAAB", count);
			});
			$("#chiasm-flat").addClass("chiasm");
		}
		else if (mainOutline.head.contentType == "outline")
		{
			PublishOutlineViewItems(mainOutline.body.concepts, "#chiasm-" + "indent");
			var result = generateHierarchicalFlat(mainOutline);
			$("#chiasm-flat").append(result.html);			
		}
		else if (mainOutline.head.contentType == "panel")
		{
			var result = generatePanelIndent(mainOutline);
			$("#chiasm-indent").append(result.html);
			$("#chiasm-indent div").click(highlightItem);
			
			var result = generatePanelFlat(mainOutline);
			$("#chiasm-flat").append(result.html);
			$("#chiasm-flat div").click(highlightItem);
			$("#chiasm-flat").addClass("chiasm");
		}
	}