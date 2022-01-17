function (res) {
			if (this.trace) {
				this.trace.push({ date: new Date().getTime(), callFrames: res.callFrames });
				$(this).triggerHandler("trace", this);
			}
		}