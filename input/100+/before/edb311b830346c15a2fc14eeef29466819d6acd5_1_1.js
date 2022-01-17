function(event) {
	if(!this.emulator.paused) {			
		var code = this.convert(event.keyCode, event);
		if(code == 0)
			return true;
		
		this.downKeys[""+code] = true;
		
		if(code >= 0x90)
			return true;

		// TODO: some apps seem to assume that key input should go to this magical address...
		this.emulator.RAM[0x9000 + this.keys.length % 0xf] = code;
		
		this.keys.push(code);
		
		
		if(this.interruptsOn)
			this.emulator.interrupt(this.interruptMessage);
	}
	
	return event.keyCode == 8 ? false : true;
}