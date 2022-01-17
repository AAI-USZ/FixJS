function create() {
	id = ++localStorage.last_id
	$('editor').textContent = ''
	localStorage.setItem(id, '')
	location.hash = '#'+ id
	select()
	updateList()
}