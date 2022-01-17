function updateDebugger() {
	//console.log("updateDebugger");
	if(emulator.paused) {
		$("#debugger_line").show();
		
		ensureDebuggerLineVisible();
		updateDebuggerLine();
		updateRegisterWindow();
		updateMemoryWindow();
		updateCycles();
		
		$("#pause_button").hide();
		$("#step_button").show();
		$("#run_button").show();
	}
	else {
		//$("#debugger_line").hide();
		$("#pause_button").show();
		$("#step_button").hide();
		$("#run_button").hide();
	}
}