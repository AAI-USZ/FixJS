function ( opacity ) {
	opacity = opacity ? " style='opacity:" + opacity + "'" : "";
	$(this).before("<mask" + opacity + "></mask>");
	return this;
}