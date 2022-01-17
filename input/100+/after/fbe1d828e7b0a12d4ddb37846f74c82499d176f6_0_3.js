function(data) {
	if( data === $_ ) return;
	buildingblocks.Element.call(this);
	this.image_data = data;
	var source_txt = "<img alt='image preload filler" + this.Id() + "' ";
	source_txt += "src='" + data.source + "' ";
	source_txt += "id='furytile-image-preload-" + this.Id() + "' ";
	source_txt += "style='display : none; position : absolute;'/>";
	buildingblocks.Element.Parent.append(source_txt);
	this.source = js.Lib.document.getElementById("furytile-image-preload-" + this.Id());
	this.index = buildingblocks.Canvas.RegisterImage(this);
	this.frame = data.frame;
	this.image_source = js.Lib.document.images[js.Lib.document.images.length - 1];
	var max_width = this.image_source.width;
	var width = data.source_size.width;
	this.max_frames = { width : Math.floor(max_width / width), height : null};
	var max_height = this.image_source.height;
	var height = data.source_size.height;
	this.max_frames.height = Math.floor(max_height / height);
}