function expand_userhistory(){
    if (document.getElementById('user_searches').style.height == "225px") {
	    <!-- document.getElementById('user_searches').style.overflow = "hidden"; -->
	    document.getElementById('user_searches').style.height = "35px";
	document.getElementById('user_searches_arrow_clicked').id='user_searches_arrow';
    } else {
	    <!--document.getElementById('user_searches').style.overflow = "auto"; -->
	    document.getElementById('user_searches').style.height = "225px";
	document.getElementById('user_searches_arrow').id='user_searches_arrow_clicked';
    }
}