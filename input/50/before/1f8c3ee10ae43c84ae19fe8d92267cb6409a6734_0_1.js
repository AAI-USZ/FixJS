function show(id) {
	$('editor').innerHTML = localStorage.getItem(id + '_html') || ''
	localStorage.setItem('current-document', id)
}