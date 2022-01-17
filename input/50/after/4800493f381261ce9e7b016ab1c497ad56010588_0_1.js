function (callFrames, event) {
			if (this.traceOnPause) {
				var trace = new Trace.Trace(callFrames, event);
				this.trace.push(trace);
			}
		}