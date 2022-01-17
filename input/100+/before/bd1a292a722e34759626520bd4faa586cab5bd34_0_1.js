function check() {
	var hash = location.hash
	if (hash) {
		id = hash.slice(1)
		if (id in localStorage) {
			show(id)
		}
	} else {
		show(localStorage.getItem('current-document'))
		location.hash = '#'+localStorage.getItem('current-document')
	}
	updateList()
	select()
	document.getElementsByTagName('body')[0].className = localStorage.getItem('bgcolor') +' '+ localStorage.getItem('typeface')
	$('aside').className = 'visible'
	setTimeout( function() { $('aside').className = '' } , 2000) // maybe only fade out after typing start
}