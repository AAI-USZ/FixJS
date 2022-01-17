function recalculateEventDate(id) 
{
	// covert tape element ID to ID for the relevant lable  
	var left 	= $("#"+id).css('left');
	var width 	= $("#"+id).css('width');
	
	var left = parseInt(left);
	var width = parseInt(width);
	
	//caluclate and remove offset from begining of timeline
	var offset = parseInt(Timeliner.timeline().getBand(0)._bandInfo.ether._band._viewOffset);	
	var begin 	= Timeliner.timeline().getBand(0)._bandInfo.ether.pixelOffsetToDate(left+offset);
	var end 	= Timeliner.timeline().getBand(0)._bandInfo.ether.pixelOffsetToDate(width+offset+left);

	if (id != null) {var id = "label"+ id.substr(5);}
	
	//this to prevent a problem with rounding that dates to be 1px out sometimes
	if (parseInt(begin.getMonth()) > 5)
	{
		var rounded_begin = parseInt(begin.getFullYear());
		rounded_begin ++; 
	}
	else 
	{
		rounded_begin= begin.getFullYear();
	}
	
	if (parseInt(end.getMonth()) > 5)
	{
		var rounded_end = parseInt(end.getFullYear());
		rounded_end++; 
	}
	else 
	{
		rounded_end= end.getFullYear();
	}	
	
	if (rounded_begin != rounded_end) {
		$('#'+id+" .info").replaceWith('<span class="info" >(<span class="begin_date" data-epoch="' + begin.getTime() + '">' + rounded_begin + '</span> - <span class="end_date" data-epoch="' + end.getTime() + '">'+ rounded_end+'</span>)</span>');	
	} 
	
	else {
		$('#'+id+" .info").replaceWith(' <span class="info">(<span class="begin_date" data-epoch="' + begin.getTime() + '" >'+rounded_begin+'</span>)</span>');	
	}
}