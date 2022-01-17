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
}