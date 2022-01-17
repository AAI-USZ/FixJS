function alphabeticSort(a, b) {
	a = a[1].toLowerCase();
	b = b[1].toLowerCase();
	
	if (a < b) {
		return -1;
	} else if (a > b) {
		return 1;
	} else {
		return 0;
	}
}