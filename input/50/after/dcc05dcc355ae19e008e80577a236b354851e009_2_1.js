function(){
		
	// Render the calendar
	ui.renderCalendar();
	
	/*ui.renderTime();*/
	
	$(window).resize (function() {ajustarColores();});
	refiring();

}