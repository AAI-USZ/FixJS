function encodeParams(data) {
			if (typeof data == 'string' || data.nodeType)
				return data;
			var s = [];
			function processParam(paramName, paramValue) {
				if (isList(paramValue))
					each(paramValue, function(v) {processParam(paramName, v);});
				else
					s.push(encodeURIComponent(paramName) + ((paramValue != null) ?  '=' + encodeURIComponent(paramValue) : ''));
			}
			each(data, processParam);
			return s.join('&');
		}