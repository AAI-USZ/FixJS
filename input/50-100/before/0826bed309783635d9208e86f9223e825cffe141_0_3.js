function get_chrome(uri, tag, callback)

{

	var xhr = new XMLHttpRequest();

	xhr.open('GET', uri, true);

	xhr.overrideMimeType('text/plain; charset=x-user-defined');

	xhr.responseType = 'arraybuffer';

	xhr.onload = function(e)

	{

		if (this.status == 200)

		{

			callback(findOgg(this.response, tag), tag, uri);

		}

	}

	xhr.send();

}