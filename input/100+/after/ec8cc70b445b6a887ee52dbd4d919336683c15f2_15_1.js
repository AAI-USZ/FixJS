function() {
	var text =	'<div class=\'<%= obs.attr("foo") %>' +
							'<%= obs.attr("bar") %><%= obs.attr("baz") %>\'></div>',

	obs = new Can.Observe({
		foo: 'a',
		bar: 'b',
		baz: 'c'
	}),

	compiled = new Can.EJS({ text: text }).render({ obs: obs })
	
	var div = document.createElement('div');

	div.appendChild(Can.view.frag(compiled));

	equals(div.innerHTML, '<div class="abc"></div>', 'initial render');

	obs.attr('bar', 'e');

	equals(div.innerHTML, '<div class="aec"></div>', 'updated values');
	
	obs.attr('bar', 'f');

	equals(div.innerHTML, '<div class="afc"></div>', 'updated values');
}