function createContentDiv(){
		contentDiv = $("<div/>",{
			id : "contentDiv"
		}).appendTo(parentDiv);
		contentDiv.css({
			"border" : "1px solid",
			"padding-top" : "10px",
			"padding-bottom" : "10px",
			"min-height" : "100px"	
		});
		
	}