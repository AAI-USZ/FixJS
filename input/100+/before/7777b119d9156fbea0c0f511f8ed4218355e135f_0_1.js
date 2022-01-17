function transition_about(){
    if (document.getElementById('about').style.height == "175px") {
	document.getElementById('about').style.height = "35px";
	document.getElementById('about_arrow_clicked').id='about_arrow';			}
    else {
	document.getElementById('about').style.height = "175px";
	document.getElementById('about_arrow').id='about_arrow_clicked';
    }
}