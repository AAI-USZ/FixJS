function startDebugger() {
	if(userData.fileSaved)
		save();

	$("#debug_button").hide();
	$("#save_button").hide();
	$("#open_button").hide();
	$("#new_button").hide();
	$("#post_button").hide();

	$("#run_button").show();
	$("#step_button").show();
	$("#pause_button").show();
	if(!readOnly)
		$("#stop_button").show();
	else
		$("#clone_button").show();
	$("#reset_button").show();
	
	$("#listing").find(".offset").unbind();
	$("#listing").find(".hexidecimal").unbind();
	$("#listing").find(".label_ref").unbind();
	
	$("#listing").html(listing.htmlFormat());
	
	$("#listing").find(".offset").click(function(evt) {
		var lineNumber = parseInt(this.id.substr("offset_line_".length));
		toggleBreakpoint(lineNumber);
	});
	$("#listing").find(".hexidecimal").click(function(evt) {
		gotoMemoryLocation(parseInt($(this).text()));
	});
	$("#listing").find(".label_ref").click(function(evt) {
		var offset = listing.labels[$(this).text()];
		var top = getLineTop(calculateLine(offset));
		scrollListingTo(top, true);
	});
	
	for(var bp in _debugger.breakpoints) {
		$("#offset_line_"+_debugger.breakpoints[bp]).addClass("breakpoint");
	}
	
	$("#editing_windows").hide();
	$("#debugging_windows").show();
	
	emulator.reboot();
	emulator.paused = true;
	emulator.run(listing.bytecode());
	updateRegisterWindow();
	
	_gaq.push(['_trackEvent', "debugger", "start"]);
}