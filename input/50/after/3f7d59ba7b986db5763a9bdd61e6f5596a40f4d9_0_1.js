function() {
		var elt = document.getElementById("grLine" + this.id);
		elt.parentNode.removeChild(elt);
		graphicsArray[this.id] = undefined;
	}