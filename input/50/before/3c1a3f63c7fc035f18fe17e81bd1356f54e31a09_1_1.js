function(inControl, inA) {
		this.inherited(arguments);
		enyo.Arranger.opacifyControl(inControl, inA.top % this.colHeight != 0 ? 0.25 : 1);
	}