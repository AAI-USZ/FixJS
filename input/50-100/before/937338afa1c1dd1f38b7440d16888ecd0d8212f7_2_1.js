function toggle(id) {
		var d = document.getElementById(id) && document.getElementById(id).style.display;
		if (d) {
			if (d == "none" || d == "") {
				d = "block"
			}
			else {
				d = "none";
			}
		}
	}