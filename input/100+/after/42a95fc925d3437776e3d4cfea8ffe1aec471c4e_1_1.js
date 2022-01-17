function (trace) {
			var shared, rel;

			while (trace) {
				shared = _sharedCallerCount(this.callFrames, trace.callFrames);
				
				// No relationship or trace is child of our parent
				if (shared === 0 || shared >= trace.callFrames.length - 1) { break; }
				trace = trace.parent;
			}

			// Caution: if both traces have only one callframe, length will be 0, too
			// They might still be related, though (window.setTimeout)
			if (! trace || (shared === 0 && (this.callFrames.length > 1 || trace.callFrames.length > 1))) {
				//console.log(this.id + ' is a root trace', this, trace);
				roots.push(this);
			}
			else if (this.callFrames.length > trace.callFrames.length) {
				//console.log(this.id + ' is a child of ' + trace.id, this, trace);
				trace.children.push(this);
				this.parent = trace;
				if (trace.event) { this.setEvent(trace.event); }
			}
			else if (this.callFrames.length === trace.callFrames.length) {
				//console.log(this.id + ' is a sibling of ' + trace.id, this, trace);
				if (trace.next) {
					console.error("Sibling already has a next trace", trace.next);
				}
				this.previous = trace;
				trace.next = this;
				if (trace.parent) { this.parent = trace.parent; }
				if (trace.event) { this.setEvent(trace.event); }
			}
			else {
				console.error("A non-root trace has less callframes than another trace and all its parents", this, trace);
			}
		}