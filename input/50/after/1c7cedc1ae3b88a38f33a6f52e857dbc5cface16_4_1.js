function segsCollide(seg1, seg2, divideCabins) {
	//Only collide if they are on the same cabin...
	if(divideCabins == true 
			&& !onSameCabine(seg1.event, seg2.event))
		return false;
		
	return seg1.end > seg2.start && seg1.start < seg2.end;
}