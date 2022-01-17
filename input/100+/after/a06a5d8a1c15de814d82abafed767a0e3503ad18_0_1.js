function getAdjacent(el){
		//get next element if none exists assume at the end and go the beginning.
		var nextEl = (el.closest('span').nextAll()[0] == undefined) ? $('.incorrect').first(): el.closest('span').nextAll()[0],
		//get the previous element if none exists go to the end.
		prevEl = (el.closest('span').prevAll()[0] == undefined) ? $('.incorrect').last() : el.closest('span').prevAll()[0];

		return [$(nextEl), $(prevEl)];
	}