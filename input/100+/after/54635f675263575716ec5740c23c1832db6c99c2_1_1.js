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
		li.appendChild(json);

		var text = JSON.stringify(e.detail, null, 2);

		var rainbow_a_fonctionne = false;
		if (text.length < 512)
		{
			try {
				Rainbow.color(text,
					'generic', function(html) {
					json.innerHTML = html;
				});
				rainbow_a_plante = true;
			} catch (e) {console.log(e);}
		}

		if (!rainbow_a_fonctionne && json.innerHTML.childNodes)
			json.appendChild(document.createTextNode(text));

	}

	var console = obj.console;
	console.appendChild(li);

	if (obj.max_capacity)
		console.removeChild(console.firstChild);
	else if (console.childNodes.length == 511)
		obj.max_capacity = true;

	console.scrollTop = console.scrollHeight;
}