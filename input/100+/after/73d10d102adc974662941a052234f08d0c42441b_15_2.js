function (a, b) {
			// TODO: if this fails, should check again if a equals b using
			//       guaranteed deterministic alternative to JSON.stringify
			return JSON.stringify(a) === JSON.stringify(b);
		}