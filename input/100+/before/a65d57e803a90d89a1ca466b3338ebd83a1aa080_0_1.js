function getComponents() {

	var request = new XMLHttpRequest();
	request.open("GET", "/get-components");

	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			var response = JSON.parse(request.responseText);

			document.getElementById('all').innerHTML = response['all'];
			document.getElementById('without').innerHTML = response['without'];
			document.getElementById('with').innerHTML = response['with'];
		}
	}
	request.send();
}