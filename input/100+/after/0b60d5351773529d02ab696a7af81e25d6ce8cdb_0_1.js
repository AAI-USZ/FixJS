function (data, labels_y) {
	this.paper.clear();
	
  	// Draw segments
	for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < data[i].segments.length ; j++){
			var segment = data[i].segments[j];
			this.drawSegment(segment, i);
		}
		this.drawGroupPos(data[i], i * 10);
	}

	// Write labels on their x,y
	var writtenLabels = {}
	for (var i = 0; i < data.length; i++) {
		for (var ii = 0; ii < data[i].segments.length ; ii++) {
	        var segment = data[i].segments[ii]
	        var label_id = segment['start'] + segment['group']
	        if (! writtenLabels[label_id]){
	        	writtenLabels[label_id] = 1
	  		    this.write(segment['group'],segment['start'][0] + 5, segment['start'][1] - 5);
	        }
    	}
  	}
}