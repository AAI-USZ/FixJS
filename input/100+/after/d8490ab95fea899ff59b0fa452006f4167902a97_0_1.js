function navBar(){
	var section1Top =  0;
	// The top of each section is offset by half the distance to the previous section.
	var section2Top =  $('#upload').offset().top - (($('#download').offset().top - $('#upload').offset().top) / 2);
	var section3Top =  $('#download').offset().top - (($('#apphelp').offset().top - $('#download').offset().top) / 2);
	var section4Top =  $('#apphelp').offset().top - (($('#guardians').offset().top - $('#apphelp').offset().top) / 2);
	var section5Top =  $('#guardians').offset().top - (($('#tagging').offset().top - $('#guardians').offset().top) / 2);
	var section6Top =  $('#tagging').offset().top - (($('#playlist').offset().top - $('#tagging').offset().top) / 2);
	var section7Top =  $('#playlist').offset().top - (($('#calllog').offset().top - $('#playlist').offset().top) / 2);
	var section8Top =  $('#calllog').offset().top - (($('#data').offset().top - $('#calllog').offset().top) / 2);
	var section9Top =  $('#data').offset().top - (($(document).height() - $('#data').offset().top) / 2);;
		
		$('nav#primaryLeft a').removeClass('active');
	if($(document).scrollTop() >= section1Top && $(document).scrollTop() < section2Top){
		$('nav#primaryLeft a.dashboard').addClass('active');
	} else if ($(document).scrollTop() >= section2Top && $(document).scrollTop() < section3Top){
		$('nav#primaryLeft a.upload').addClass('active');
	} else if ($(document).scrollTop() >= section3Top && $(document).scrollTop() < section4Top){
		$('nav#primaryLeft a.download').addClass('active');
	} else if ($(document).scrollTop() >= section4Top && $(document).scrollTop() < section5Top){
		$('nav#primaryLeft a.apphelp').addClass('active');
	} else if ($(document).scrollTop() >= section5Top && $(document).scrollTop() < section6Top){
		$('nav#primaryLeft a.guardians').addClass('active');
	} else if ($(document).scrollTop() >= section6Top && $(document).scrollTop() < section6Top){
	$('nav#primaryLeft a.tagging').addClass('active');
	} else if ($(document).scrollTop() >= section7Top && $(document).scrollTop() < section6Top){
		$('nav#primaryLeft a.playlist').addClass('active');
	} else if ($(document).scrollTop() >= section8Top && $(document).scrollTop() < section6Top){
		$('nav#primaryLeft a.calllog').addClass('active');
	} else if ($(document).scrollTop() >= section9Top){
		$('nav#primaryLeft a.data').addClass('active');
	}
	/* gray background behind the navigation */	
		$('nav#barBg a').removeClass('active');
	if($(document).scrollTop() >= section1Top && $(document).scrollTop() < section2Top){
		$('nav#barBg a.dashboard').addClass('active');
	} else if ($(document).scrollTop() >= section2Top && $(document).scrollTop() < section3Top){
		$('nav#barBg a.upload').addClass('active');
	} else if ($(document).scrollTop() >= section3Top && $(document).scrollTop() < section4Top){
		$('nav#barBg a.download').addClass('active');
	} else if ($(document).scrollTop() >= section4Top && $(document).scrollTop() < section5Top){
		$('nav#barBg a.apphelp').addClass('active');
	} else if ($(document).scrollTop() >= section4Top && $(document).scrollTop() < section6Top){
		$('nav#barBg a.apphelp').addClass('active');
	} else if ($(document).scrollTop() >= section4Top && $(document).scrollTop() < section6Top){
		$('nav#barBg a.apphelp').addClass('active');
	} else if ($(document).scrollTop() >= section4Top && $(document).scrollTop() < section6Top){
		$('nav#barBg a.apphelp').addClass('active');
	} else if ($(document).scrollTop() >= section4Top && $(document).scrollTop() < section6Top){
		$('nav#barBg a.apphelp').addClass('active');
	} else if ($(document).scrollTop() >= section4Top){
		$('nav#barBg a.apphelp').addClass('active');
	}
}