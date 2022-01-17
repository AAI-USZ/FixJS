function(field, tagOptions) {
		var tags = {
			'w3s-data-mandatory':'.',
			'w3s-data-alphaNum':'\\w',
			'w3s-data-alpha':'[A-z]',
			'w3s-data-numeric':'[0-9]',
			'w3s-data-hex':'[0-9a-fA-F]',
			'w3s-data-email':'[^@]+@[^@\.]+\.[^@]+',
			'w3s-data-date-ymd':'\\d{4}[\\/\\-\\.]?\\d\\d[\\/\\-\\.]?\\d\\d',
			'w3s-data-date-dmy':'\\d\\d\\/?\\d\\d\\/?\\d{4}',
			'w3s-data-date-mdy':'\\d\\d\\/?\\d\\d\\/?\\d{4}'
		};
        if (tagOptions) $.extend(tags, tagOptions);
		var val = $.trim(field.val());
		var classes = field.getAttr('class').split(/\s+/);
		for (var i in classes) {
			var type = classes[i];
			for (var tag in tags) {
				var rexp = tags[tag];
				if (type==='w3s-data-mandatory') {
					rexp +='+';
				} else if (!val) {
					return '';
				} else if (type!==tag) {
					if (type.indexOf(tag)!==-1) {
						var len = parseInt(type.substr(tag.length));
						if (len>0) {
							// tag with length specific. e.g w3s-data-mandatory5 means at least 5 chars
							rexp +='{'+len+',}';
						}
					} else {
						continue;
					}
				}
				return val.search(rexp)===-1?tag:'';
			}
		}
        return '';
    }