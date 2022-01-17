function (p, callback) {
			var query = new RegExp('^' + p.queryString, 'i'),
			    i,
			    d = [],
			    matchesName,
			    matchesType,
			    currentElement;

			for (i = 0; i < this.languageCodes.length; ++i) {
				currentElement = this.languageCodes[i];
				matchesName = (!p.queryString || currentElement.name.match(query));
				matchesType = (!p.objectTypeFilter || (!p.objectTypeFilter.length) || jQuery.inArray(currentElement.type, p.objectTypeFilter) > -1);

				if (matchesName && matchesType) {
					d.push(currentElement);
				}
			}

			callback.call(this, d);
		}