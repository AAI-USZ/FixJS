function (e) {
				console.error("Unresolved promise:" +
					((e.stack && e.stack.toString()) || 'no stack available'));
			}