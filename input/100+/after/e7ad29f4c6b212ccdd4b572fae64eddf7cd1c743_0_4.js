function(){
	XM.String = {
		
		/**
		 * Appends content to the query string of a URL, handling logic for whether to place a question mark or ampersand.
		 * @param   {String} url    The URL to append to.
		 * @param   {String} string The content to append to the URL.
		 * @return  {String} The resulting URL
		 */
		appendURL : function(url, string) {
				if (!Ext.isEmpty(string)) {
						return url + (url.indexOf('?') === -1 ? '?' : '&') + string;
				}
				return url;
		},
		
		/**
		 * Convert certain characters (&, <, >, and ") to their HTML character equivalents for literal display in web pages.
		 * @method
		 * @param   {String} value The string to encode
		 * @return  {String} The encoded text
		 */
		HTMLEncode: (function() {
				var entities = {
						'&': '&amp;',
						'>': '&gt;',
						'<': '&lt;',
						'"': '&quot;'
				}, keys = [], p, expression;
				
				for (p in entities) {
						keys.push(p);
				}
				
				expression = new RegExp('(' + keys.join('|') + ')', 'g');
				
				return function(value) {
						return (!value) ? value : String(value).replace(expression, function(match, capture) {
								return entities[capture];
						});
				};
		})()
	};
}