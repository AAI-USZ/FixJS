function serifToggle() {
    var body = document.getElementsByTagName('body')[0]
	if(body.className == 'serif') {
		body.className = localStorage.getItem('bgcolor')
		localStorage.setItem('typeface', '')
	}
	else {
		body.className = 'serif '+localStorage.getItem('bgcolor')
		localStorage.setItem('typeface', 'serif')
	}
}