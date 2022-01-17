function get_chrome(link, callback)

{

	var xhr = new XMLHttpRequest();

	xhr.open('GET', link.realhref, true);

	xhr.overrideMimeType('text/plain; charset=x-user-defined');

	xhr.responseType = 'arraybuffer';

	xhr.onload = function(e) {

		if (this.status == 200)	{

			callback(findOgg(this.response, link.tag), link);

		}

	};

	xhr.send();

}