function(s) {
	var i;
	for(i = 0; i < s.length; i++) {
		if (! ((s.charAt(i) >= "a" && s.charAt(i) <= "z") ||
		       (s.charAt(i) >= "A" && s.charAt(i) <= "Z"))) {
			return false;
		}
	}
	return true;
}