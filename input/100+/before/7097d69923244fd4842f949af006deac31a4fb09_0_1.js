function () {
	//The preprocessing before the actual iteration loop:
	if ((this.stopEmulator & 2) == 0) {
		if ((this.stopEmulator & 1) == 1) {
			if (!this.CPUStopped) {
				this.stopEmulator = 0;
				this.audioUnderrunAdjustment();
				this.clockUpdate();			//RTC clocking.
				if (!this.halt) {
					this.executeIteration();
				}
				else {						//Finish the HALT rundown execution.
					this.CPUTicks = 0;
					this.calculateHALTPeriod();
					if (this.halt) {
						this.updateCoreFull();
					}
					else {
						this.executeIteration();
					}
				}
				//Request the graphics target to be updated:
				this.requestDraw();
			}
			else {
				this.audioUnderrunAdjustment();
				this.audioTicks += this.CPUCyclesTotal;
				this.audioJIT();
				this.stopEmulator |= 1;			//End current loop.
			}
		}
		else {		//We can only get here if there was an internal error, but the loop was restarted.
			cout("Iterator restarted a faulted core.", 2);
			pause();
		}
	}
}