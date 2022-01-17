function ( opacity ) {
	opacity = opacity ? " style='opacity:" + opacity + "'" : "";
	$(this).prepend("<mask" + opacity + "></mask>");
}