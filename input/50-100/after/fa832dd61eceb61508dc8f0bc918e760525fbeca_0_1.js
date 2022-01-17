function mHTML(){
		var html = "<div id='more' style='clear:both;'> </h1>"+"tags:<div class='tag' >"+this.tags[0]+"</div>"+"<div class='tag' >"+this.tags[1]+"</div>"+"<div class='tag' >"+this.tags[2]+"</div>"+" description:"+this.description+"<ul id='tracklist'><li>"+this.track1+"</li><li>"+this.track2+"</li><li>"+this.track3+"</li><li>"+this.track4+"</li><li>"+this.track5+"</ul></div>"; // do the same for track2 etc ..
	return html;
	}