function(f) {
	this.max_frames = { width : Math.floor(this.jqsource.width() / this.image_data.source_size.width), height : Math.floor(this.jqsource.height() / this.image_data.source_size.height)};
	if(f != null) {
		this.frame += 1;
		this.frame %= this.max_frames.width * this.max_frames.height;
	}
	var fw = this.frame % this.max_frames.width;
	var fh = Math.floor(this.frame / this.max_frames.width);
	var s = this.image_data.source_size;
	return { x : fw * s.width, y : fh * s.height};
}