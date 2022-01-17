function(evt) {

	var Highlighter = eXo.calendar.Highlighter ;

	var _e = window.event || evt ;	

	var sPos = Highlighter.getPos(Highlighter.startCell) ;

	var fixleftIE = (document.all && document.getElementById("UIWeekView"))? 6 : 0 ; //TODO : No hard code 

	try{

		var cPos = Highlighter.getMousePos(_e) ;

		var len = cPos.y - sPos.y ;	

		var startBlock = null ;

		var endBlock = null ;

		var startIndex = null ;

		var lastIndex = null ;

		var startX = null ;

		var startY = null ;

		var endX = null ;

		var startWidth = null ;

		if(len == 0) {

			var diff = cPos.x - sPos.x ;

			startBlock = Highlighter.startBlock ;

			Highlighter.hideAll(startBlock) ;

			if (diff > 0) {

				Highlighter.reserveDirection(Highlighter.startCell, Highlighter.container,startBlock) ;

				startBlock.style.width = (diff + 1)*Highlighter.dimension.x + "px" ;

				Highlighter.firstCell = Highlighter.startCell ;

				Highlighter.lastCell  = Highlighter.currentCell ;

			} else {

			 	Highlighter.reserveDirection(Highlighter.currentCell, Highlighter.container,startBlock);

				startBlock.style.width = (1 - diff)*Highlighter.dimension.x + "px" ;

			 	Highlighter.lastCell = Highlighter.startCell ;

				Highlighter.firstCell  = Highlighter.currentCell ;

			}

			

		} else {		

			if (len >= 0) {

				startIndex = sPos.y ;

				lastIndex = startIndex + len ;

				startBlock = Highlighter.startBlock

				endBlock = Highlighter.block[lastIndex] ;

				startX = eXo.core.Browser.findPosXInContainer(Highlighter.startCell, Highlighter.container) ;

				startY = eXo.core.Browser.findPosYInContainer(Highlighter.startCell, Highlighter.container) ;

				endX = (cPos.x + 1)*Highlighter.dimension.x ;

				startWidth = (Highlighter.cellLength - sPos.x)*Highlighter.dimension.x ;

				Highlighter.firstCell = Highlighter.startCell ;

				Highlighter.lastCell  = Highlighter.currentCell ;

				Highlighter.reserveDirection(Highlighter.startCell, Highlighter.container,startBlock) ;

			} else {

				startIndex = sPos.y  + len ;

				lastIndex = sPos.y ;

				startBlock = Highlighter.block[startIndex] ;

				endBlock = Highlighter.block[lastIndex] ;

				startX = eXo.core.Browser.findPosXInContainer(Highlighter.currentCell, Highlighter.container) ;

				startY = eXo.core.Browser.findPosYInContainer(Highlighter.currentCell, Highlighter.container) ;

				endX = (sPos.x + 1)*Highlighter.dimension.x ;

				startWidth = (Highlighter.cellLength - cPos.x)*Highlighter.dimension.x ;

				Highlighter.lastCell = Highlighter.startCell ;

				Highlighter.firstCell  = Highlighter.currentCell ;

				Highlighter.reserveDirection(Highlighter.currentCell, Highlighter.container,startBlock) ;

			}

			startBlock.style.display = "block" ;

			startBlock.style.top = startY  + gj('.UIMonthView .MainWorkingPanel').scrollTop() + "px" ;

			startBlock.style.width = startWidth + "px" ;

			startBlock.style.height = Highlighter.dimension.y + "px" ;

			if(Math.abs(len) >= 1) {

				for(var i = startIndex + 1 ; i < (startIndex + Math.abs(len)); i ++) {

					Highlighter.block[i].style.display  = "block" ;

					Highlighter.block[i].style.top  = parseInt(Highlighter.block[i - 1].style.top) + Highlighter.dimension.y + "px" ;

					Highlighter.reserveDirection(Highlighter.cell[0], Highlighter.container,Highlighter.block[i]) ;

					Highlighter.block[i].style.width = Highlighter.cellLength*Highlighter.dimension.x + "px" ;

					Highlighter.block[i].style.height = Highlighter.dimension.y + "px" ;

				}

			}

			endBlock.style.display  = "block" ;

			endBlock.style.top  = parseInt(Highlighter.block[lastIndex - 1].style.top) + Highlighter.dimension.y + "px" ;

			Highlighter.reserveDirection(Highlighter.cell[0], Highlighter.container,endBlock) ;

			endBlock.style.width = endX + "px" ;

			endBlock.style.height = Highlighter.dimension.y + "px" ;

			Highlighter.hideBlock(startIndex, lastIndex) ;

		}

	} catch(e){

			window.status = e.message ;

	}			

}