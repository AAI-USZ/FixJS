function (e) {
				console.error(((e.stack && e.stack.toString()) ||
					"Unresolved promise: no stack available"));
			}