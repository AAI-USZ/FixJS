function() {
		var script;
		if (interactiveScript && interactiveScript.readyState === "interactive") {
			return interactiveScript;
		}

			return null;
		}