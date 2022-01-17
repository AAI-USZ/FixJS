function(detail, obj, e)
{
	var li = newDom('li');
	var type = newDom('strong');
	type.appendChild(document.createTextNode(e.type));
	li.appendChild(type);

	if (typeof detail !== 'undefined')
	{
		var json = newDom('span');
		json.className = 'json rainbow';

		var text = JSON.stringify(e.detail, null, 2);

		if (text.length < 512)
		{
			Rainbow.color(text,
				'generic', function(html) {
				json.innerHTML = html;
			});
		} else {
			json.appendChild(document.createTextNode(text));
		}

		li.appendChild(json);
	}

	var console = obj.console;
	console.appendChild(li);

	if (obj.max_capacity)
		console.removeChild(console.firstChild);
	else if (console.childNodes.length == 511)
		obj.max_capacity = true;

	console.scrollTop = console.scrollHeight;
}