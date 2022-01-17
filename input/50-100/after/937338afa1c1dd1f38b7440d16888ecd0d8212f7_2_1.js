function toggle(id) {
		var s = document.getElementById(id) && document.getElementById(id).style;
		s.display = (s.display == "none" || s.display == "") ? "block":"none";
	}