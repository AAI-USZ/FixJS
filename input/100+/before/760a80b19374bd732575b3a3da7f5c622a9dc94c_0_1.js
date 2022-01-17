function() {
		console.log("--- DCPU-16 Emulator ---");
	
		this.program =  null;
		this.PC.set(0);
		this.CPU_CYCLE = 0;
		this.RAM = new Array(0x10000);
		this.asyncSteps = 1;
		
		this.interruptQueueingEnabled = false;
		this.interruptQueue = [];
		
		for(var r in this.Registers) {
			this.Registers[r].set(0);
		}
		this.Registers.SP.set(0xffff);
		
		for(var i = 0; i < this.devices.length; i++) {
			this.devices[i].init();
		}
	}