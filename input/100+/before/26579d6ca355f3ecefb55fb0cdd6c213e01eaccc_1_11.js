function(){

	var tableTest = Function.attempt(function(){
		var table = document.createElement('table');
		table.innerHTML = '<tr><td></td></tr>';
	});

	var wrapper = document.createElement('div');

	var translations = {
		table: [1, '<table>', '</table>'],
		select: [1, '<select>', '</select>'],
		tbody: [2, '<table><tbody>', '</tbody></table>'],
		tr: [3, '<table><tbody><tr>', '</tr></tbody></table>']
	};
	translations.thead = translations.tfoot = translations.tbody;

	/*<ltIE9>*/
	// technique by jdbarlett - http://jdbartlett.com/innershiv/
	wrapper.innerHTML = '<nav></nav>';
	var HTML5Test = wrapper.childNodes.length == 1;
	if (!HTML5Test){
		var tags = 'abbr article aside audio canvas datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video'.split(' '),
			fragment = document.createDocumentFragment(), l = tags.length;
		while (l--) fragment.createElement(tags[l]);
		fragment.appendChild(wrapper);
	}
	/*</ltIE9>*/

	var html = {
		set: function(html){
			if (typeOf(html) == 'array') html = html.join('');

			var wrap = (!tableTest && translations[this.get('tag')]);
			/*<ltIE9>*/
			if (!wrap && !HTML5Test) wrap = [0, '', ''];
			/*</ltIE9>*/
			if (wrap){
				var first = wrapper;
				first.innerHTML = wrap[1] + html + wrap[2];
				for (var i = wrap[0]; i--;) first = first.firstChild;
				this.empty().adopt(first.childNodes);
			} else {
				this.innerHTML = html;
			}
		}
	};

	html.erase = html.set;

	return html;
}