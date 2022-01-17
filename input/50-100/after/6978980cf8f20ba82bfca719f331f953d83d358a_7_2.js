function create( tag ){
	var layer = document.createElement( tag );
    document.body.appendChild( layer );
	layer.style.width =
	layer.style.height =
	layer.style.margin =
	layer.style.padding = "20px";
	layer.style.border = "20px solid #fff";
	!~'body|input'.indexOf(tag) && (layer.innerHTML = '&nbsp');
	return layer;
}