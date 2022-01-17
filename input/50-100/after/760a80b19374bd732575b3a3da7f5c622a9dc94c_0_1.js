function() {
		if(this.contents == 0) throw "Stack underflow";
		val = this.emulator.RAM[this.contents] || 0;
		this.emulator.RAM[this.contents] = 0;
		this.contents = (this.contents + 1) & 0xffff;
		return val;
	}