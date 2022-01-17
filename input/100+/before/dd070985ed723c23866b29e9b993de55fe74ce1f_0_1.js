function(res) {
	    var sel=$('select-savedqueries');
	    var id=sel.getSelected().get('value');
	    sel.set('html', '');
	    Array.push(sel.options, (new Element('option', {
		'value': '0',
		'text': ch_t('arkeogis', "Requêtes archivées")
	    })));
	    var index=1;
	    res.each(function(line) {
		Array.push(sel.options, (new Element('option', {
		    'value': line.id,
		    'text': line.name
		})));
		if (typeOf('line') != undefined && line.id == id) {
			sel.selectedIndex=index;
		}
		index++;
	    });
	}