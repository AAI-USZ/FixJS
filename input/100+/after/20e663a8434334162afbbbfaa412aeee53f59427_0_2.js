function getAdjacent(el){
		//get next element if none exists assume at the end and go the beginning.
		var nextEl = (el.nextAll().closest('.incorrect')[0] == undefined) ? $('.incorrect').first(): el.nextAll().closest('.incorrect')[0],
		//get the previous element if none exists go to the end.
		prevEl = (el.prevAll().closest('.incorrect')[0] == undefined) ? $('.incorrect').last() : el.prevAll().closest('.incorrect')[0];

		return [$(nextEl), $(prevEl)];
	}