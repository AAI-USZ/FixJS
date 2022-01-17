function create( tag ){
	if( typeof tag == "object" )
	    return tag;

	var el = document.createElement( tag );
	var parent;

	el.style.width = el.style.height = "0";
	el.style.overflow = "hidden";

	if( tag == "body" ){
	    parent = document.documentElement;
	}else{
	    parent = document.body;
	}

	parent.appendChild( el );

	return el;
}