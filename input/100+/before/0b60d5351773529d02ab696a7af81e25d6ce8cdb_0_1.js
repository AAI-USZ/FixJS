f	this.paper.clear();
  // Write labels on their x,y
  var writtenLabels={}
	for (var i=0; i< data.length; i++) {
		for (var ii = 0; ii < data[i].segments.length ; ii++){
        var segment = data[i].segments[ii]
        var label_id = segment['start']+segment['group']
        if (! writtenLabels[label_id]){
          writtenLabels[label_id] = 1
  		    this.write(segment['group'],segment['start'][0] + 5,segment['start'][1]);
        }
    }
  }
	for (var i=0; i< data.length; i++) {
		this.writeText(data[i],i * 10);
		var linesAndData = this.joinLine(data[i].segments);
//		for (var ii = 0; ii < data[i].segments.length ; ii++){
		for (var ii = 0; ii < linesAndData[0].length ; ii++){
//			var thisStringLine = this.makeStringLine([data[i].segments[ii].start, data[i].segments[ii].end]);
			//var thisStringLine = this.makeStringLine(linesAndData[0][ii]);
			//var thisStringLinea = this.makeStringLine(linesAndData[0][ii]);
			//var thisLinea = this.paper.path(thisStringLinea);
			var thisStringLine = this.makeRoundStringLine(linesAndData[0][ii],i * 10);
			var thisLine = this.paper.path(thisStringLine);
			var opts = {};
			for (key in this.defaultLine)
				opts[key] = this.defaultLine[key];
			//opts['stroke'] = data[i].segments[ii].attributes.color;
			opts['stroke'] = linesAndData[1][ii].color;
			//opts['color'] = data[i].segments[ii].attributes.color;
			opts['color'] = linesAndData[1][ii].color;
			thisLine.attr(opts);
            thisLine.mouseover(this.animateIn);
            thisLine.mouseout(this.animateOut);
		}
	}
};
