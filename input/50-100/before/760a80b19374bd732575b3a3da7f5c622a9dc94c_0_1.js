function() {
		if(this.contents == 0) throw "Stack underflow";
		return this.emulator.RAM[this.contents++] || 0;
	}