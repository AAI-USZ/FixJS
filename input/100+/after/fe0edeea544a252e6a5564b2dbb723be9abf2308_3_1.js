function(cell) {

	var table = gj(cell).parents("table")[0] ;

	var tr = gj(table).find("tr") ;

	var len = tr.length ;

	var div = null ;

	var block = new Array() ;

	for(var i = 0 ; i < len ; i ++) {

		div = document.createElement("div") ;

		div.onmousedown = eXo.calendar.Highlighter.hideAll ;

		if(gj("#UserSelectionBlock"+i)) 

			gj("#UserSelectionBlock"+i).remove() ; 

		div.setAttribute("id", "UserSelectionBlock"+i) ;

		div.className = "UserSelectionBlock" ;

		table.parentNode.appendChild(div) ;

		block.push(div) ;

	}

	eXo.calendar.Highlighter.block = block ;

}