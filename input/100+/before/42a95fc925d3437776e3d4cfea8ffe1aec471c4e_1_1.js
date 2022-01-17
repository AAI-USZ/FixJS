function (trace) {
			clearTimeout(timeout);
			var show = function (node, level) {
				var indent = "";
				for (var i = 0; i < level; i++) { indent += "  "; }
				console.log(indent + node.id, node);
				if (node.children) {
					for (var j = 0; j < node.children.length; j++) {
						if (j) { console.log(indent + "  ---"); }
						show(node.children[j], level + 1);
					}
				}
				if (node.next) {
					show(node.next, level);
				}
			};
			timeout = window.setTimeout(function () {
				console.log("---[ roots ]-------------------------------");
				for (var i = 0; i < roots.length; i++) {
					if (i) { console.log("---"); }
					show(roots[i], 0);
				}
				roots = [];
			}, 1000);

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
				console.log(this.id + ' is a root trace', this, trace);
				roots.push(this);
			}
			else if (this.callFrames.length > trace.callFrames.length) {
				console.log(this.id + ' is a child of ' + trace.id, this, trace);
				trace.children.push(this);
				this.parent = trace;
				if (trace.event) { this.setEvent(trace.event); }
			}
			else if (this.callFrames.length === trace.callFrames.length) {
				console.log(this.id + ' is a sibling of ' + trace.id, this, trace);
				if (trace.next) {
					console.log("Uh oh...", trace.next);
				}
				this.previous = trace;
				trace.next = this;
				if (trace.parent) { this.parent = trace.parent; }
				if (trace.event) { this.setEvent(trace.event); }
			}
			else {
				console.error("Should not happen", this, trace);
			}
		}