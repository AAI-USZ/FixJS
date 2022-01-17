function create( tag ){
	var layer = document.createElement( tag );

	layer.style.width =
	layer.style.height =
	layer.style.margin =
	layer.style.padding = "20px";
	layer.style.border = "20px solid #fff";

	document.body.appendChild( layer );

	return layer;
}