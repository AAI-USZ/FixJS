function (callFrames) {
			if (this.traceOnPause) {
				var trace = new Trace.Trace(callFrames);
				this.trace.push(trace);
			}
		}