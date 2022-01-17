function transition_other_shells(){
    if (document.getElementById('other_shells').style.height == "95px") {
	document.getElementById('other_shells').style.height = "35px";
	document.getElementById('other_shells_arrow_clicked').id='other_shells_arrow';
    }
    else {
	document.getElementById('other_shells').style.height = "95px";
	document.getElementById('other_shells_arrow').id='other_shells_arrow_clicked';
    }
}