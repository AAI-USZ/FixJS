function $_prototype_append () {
		return this.domManip(arguments, true, function (a) {
			this.nodeType % 10 === 1 && this.appendChild(a);
		});
	}