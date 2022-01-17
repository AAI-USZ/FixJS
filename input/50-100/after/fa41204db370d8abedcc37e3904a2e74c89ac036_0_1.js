function(key, x, y, e, graph) {
		if (key==='cost'){
			return '<h3>$' + Math.round(e.point.value) + '</h3>' +
	               '<p>' +  e.point.label + " ("+ e.point.title + ')</p>'
		}
		else if (key === 'people')
        return '<h3>' + Math.round(e.point.value) + ' million people </h3>' +
               '<p>' +  e.point.label + " ("+ e.point.title + ')</p>' 
      }