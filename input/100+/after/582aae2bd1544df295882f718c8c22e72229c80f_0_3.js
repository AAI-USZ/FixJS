function pt2px(pt) {

	screenPPI = document.getElementById('ppitest').offsetWidth;

	return pt*screenPPI/72;

}