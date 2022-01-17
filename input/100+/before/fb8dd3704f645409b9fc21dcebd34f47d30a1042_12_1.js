function() {
		var inputRuler = dom.create("input", {
			style: {
				height: "auto",
				width: "auto"
			}
		}, document.body);
		
		["Date", "Time", "DateTime"].forEach(function(type) {
			try {
				inputRuler.type = type;
			} catch(e) {}
			inputSizes[type] = {
				width: inputRuler.clientWidth + 2 * borderRadius,
				height: inputRuler.clientHeight + 2 * borderRadius
			};
		});
		
		dom.detach(inputRuler);
	}