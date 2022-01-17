function colorToggle() {
	var body = document.getElementsByTagName('body')[0]
	if(body.className == 'dark') {
		body.className = localStorage.getItem('typeface')
		localStorage.setItem('bgcolor', '')
	}
	else {
		body.className = 'dark '+localStorage.getItem('typeface')
		localStorage.setItem('bgcolor', 'dark')
	}
}