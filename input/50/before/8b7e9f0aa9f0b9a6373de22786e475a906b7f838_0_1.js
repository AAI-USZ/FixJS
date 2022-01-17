function(params) {
			var trials = new Array(1);
			trials[0] = {
				"type": "call_function",
				"func": params["func"],
				"args": params["args"] || []
			}
		}