function ( opacity, message, hideSpinner ) {
    if(!message){
        message = "Loading..";
    }
    opacity = opacity ? " style='opacity:" + opacity + "'" : "";
    var spinner = "<div class='loader'>" +
    "<span></span>" +
    "<span></span>" +
    "<span></span>" +
    "<span></span>" +
    "<span></span>" +
    "<span></span>" +
    "<span></span>" +
    "<span></span>​" +
    "</div>" +
    "<div class='loaderMessage'>" + message + "</div>";
    if(!hideSpinner){
        $(this).prepend("<mask" + opacity + ">" + spinner + "</mask>");
    }
	else {
        $(this).prepend("<mask" + opacity + "></mask>");
    }
}