function replaceWith(elm, html) {
		var ne,
			ep = elm.parentNode,
			depth = 0;
		if(!ep){ //if no parents
			ep = document.createElement('DIV');
			ep.appendChild(elm);
		}
		switch (elm.tagName) {
			case 'BODY':
				ep.removeChild(elm);
				ep.innerHTML += html;
				return ep.getElementsByTagName('BODY')[0];
			case 'TBODY': case 'THEAD': case 'TFOOT':
				html = '<TABLE>' + html + '</TABLE>';
				depth = 1;
			break;
			case 'TR':
				html = '<TABLE><TBODY>' + html + '</TBODY></TABLE>';
				depth = 2;
			break;
			case 'TD': case 'TH':
				html = '<TABLE><TBODY><TR>' + html + '</TR></TBODY></TABLE>';
				depth = 3;
			break;
		}
		tmp = document.createElement('SPAN');
		tmp.style.display = 'none';
		document.body.appendChild(tmp);
		tmp.innerHTML = html;
		ne = tmp.firstChild;
		while (depth--) {
			ne = ne.firstChild;
		}
		ep.insertBefore(ne, elm);
		ep.removeChild(elm);
		document.body.removeChild(tmp);
		elm = ne;

		ne = ep = null;
		return elm;
	}