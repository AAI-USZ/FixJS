function (event, res) {
				console.log("Tracepoint set for " + name + "() in", url.replace(/^.*\//, ''), "line", res.breakpoint.location.lineNumber);
			}