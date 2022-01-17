function(e, t) {
	//I apologize in advance for the lack of readability here... :/
	var r = e.previousSibling, //refers to the comment element
		i = {}, //refers to the event Object map
		h, //array holding each event type in the Object map
		n; //index into h.  h[n] refers to a event type
	eval(r.textContent); //populates i with event Object map
	e.parentNode.removeChild(r);
	/* now i is an Object like: {
			"click": function() {...},
			"change keyup": function() {...},
			...
		}
	*/
	//now r refers to the properties populated in the event Object map
	for(r in i)
	{
		//i[r] refers to the event handler
		h = r.split(" "); //h is now ["change", "keyup", ...]
		//h[n] now refers to the event type
		for(n = 0; n < h.length; n++)
			e["on" + h[n]] = i[r];
	}
	return e["on" + t[0].type].apply(e, t);
}