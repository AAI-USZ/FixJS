f	var languages = 'js html css php'; //To begin a new language add it to this string. Use only letters.
	var panda = {
		lineNumbering : true, //set to false to disable adding line numbers.
		regex : {
			regex : /\/(.(?!\\\/)).*\//g,
			comment1 : /\/\/[^\n]*/g,
			comment2 : /\/\*(.|[\n\r])*?\*\//gm,
			comment3 : /#[^\n]*/g,
			comment4 : /(&lt;|<)!--.*?--(&gt;|>)/g,
			string1 : /"(\\"|[^"])*"/g,
			string2 : /'(\\'|[^'])*'/g,
			multiLineString1 : /"(\\"|[^"])*"/gm,
			multiLineString2 : /'(\\'|[^'])*'/gm,
			phptag : /((?:<|&lt;)\?(php)?)|(?:\?(?:>|&gt;))/g,
			htmltag : /(?:&lt;|\<).*?(?:&gt;|\>)/g,
			htmlspecial : /(?:&lt;|\<)\/?(head|html|body|a|script|meta|link)#?.*?(?:&gt;|\>)/g, //# because of our swaps
			operators : /(?:(!|=)?==?)|(?:\|\|)|[\-\+\>\/\*%]/g,
			attribute : /\s[\w\-]+(?==["'].*?['"])/g,
			phpvar : /\$[\w\d_]+(?=\W)/g,
			selector : /.*?(?=\s*\{)/g,
			extra : /[:\{\}\[\]\(\)]/g //can't includes ';' because it can be in any entity.
		}
	};
	languages.replace(/\w+/g, function(l) { panda[l] = {}; });

	panda.js.keywords = 'var function return if else while do this new typeof for null false true'.split(' ');
	panda.js.specials = 'document window Array RegExp Object Math String Number Date'.split(' ');
	panda.js.matchers = 'comment1 comment2 string1 string2 regex operators extra'.split(' ');
	
	panda.html.keywords = panda.html.specials = [];
	panda.html.matchers = 'comment4 attribute htmlspecial htmltag'.split(' ');
	
	panda.php.keywords = 'var function private public static if else return while do this new typeof for foreach as null false true'.split(' ');
	panda.php.specials = 'echo require include int array global'.split(' ');
	panda.php.matchers = 'comment3 comment2 comment1 multiLineString1 multiLineString2 phpvar phptag operators extra'.split(' ');
	
	panda.css.keywords = panda.css.specials = [];
	panda.css.matchers = 'comment2 string1 string2 selector extra'.split(' ');
	
	// For new languages. 
	// panda.newLang.keywords = 'keywords in the new language'.split(' '); 
	// panda.newLand.specials = 'special keywords often colored differently'.split(' ');
	// panda.newLang.matchers = 'list of regexs from the above which occur in this language. The order matters'.split(' ')
	
	//swap all BR elements into new lines. Makes it easier imo. 
	function brSwap(code, dir) {
		return dir ? code.replace(/\n/g, '<br/>') : code.replace(/\<br\s?\/?\>/g, '\n');
	};
	
	//wrap text in SPAN tags with a classname.
	function spanWrap(cn, text) {
		return '<span class="' + cn + '">' + text + '</span>';
	};
	
	//replaces special words such as 'var' and 'function' etc. Avoids it in variable names such as var myfunction;
	function parseSpecial(code, word, cn) {
		return code.replace(RegExp('(^|\\W)' + word + '(\\W)', 'g'), function(c) {
			return c.replace(word, spanWrap(cn, word) );
		});
	};
	
	//adds the line numbers. If you wish to add a classname to each line add it in this func.
	function addLines(code) {
		return '<ol class="pandaCode"><li>' + code.split(/\n/).join('</li><li>') + '</li></ol>';
	};
	
	//parse function parses a string of text for any of the set up languages above.
	panda.parse = function(type, code) {
		var codeObj = panda[type];
		if(!codeObj) return code;
		var matchers = codeObj['matchers']
		, keywords = codeObj['keywords']
		, specials = codeObj['specials']
		, uid = (new Date()).getTime() //unique ID for our replacements. 
		, store = {}
		, code = brSwap( code.replace(/(^[\s\t\n]+)|([\s\t\n]+$)/g, '') ); //remove whitespace at start and end. and BR's
		
		for(var i = 0, l = matchers.length; i<l; i++) {
			var m = matchers[ i ]
			, r = this.regex[ m ]
			, key = '#' + m + '_' + uid + '_'
			, count = 0
			, hold = store[ m ] = {};
			if(!r) continue;
			
			code = code.replace(r, function( c ) {
				var alias = key + count++ + '_' + (r.multiline ? 'm' : '') + '#'; //creates a swap like #regex_uid_1#
				hold[ alias ] = c;
				return alias;
			});
		};
		
		for(i = 0, l = keywords.length; i<l; i++) code = parseSpecial(code, keywords[i], 'panda-keyword');
		for(i = 0, l = specials.length; i<l; i++) code = parseSpecial(code, specials[i], 'panda-special');
		
		for(i = matchers.length; i; i--) {
			var m = matchers[ i - 1 ], stripped = store[ m ];			
			for(var stripKey in stripped) {
				var s = stripped[ stripKey ];
				if(stripKey.indexOf('_m_#')) s = s.replace(/\n/g, '</span>\n<span class="panda-' + m + '">');
				code = code.replace( stripKey, spanWrap('panda-'+m, s) );
			}
		};
		
		if(this.lineNumbering) code = addLines(code);
		return brSwap( code.replace(/\t|(    )/g, '&nbsp;&nbsp;&nbsp;&nbsp;') , 1);
	};
	
	panda.colorNode = function(node) {
		var reg = /(?:\s|^)panda_(\w+)(?:\s|$)/;
		if( reg.test( node.className ) ) {
			var type = reg.exec(node.className)[1];
			if(node.nodeName.toLowerCase() == 'code' && node.parentNode.nodeName.toLowerCase() != 'pre') {
				var pre = document.createElement('pre');
				node.parentNode.insertBefore(pre, node);
				pre.appendChild( node );
			}
			node.innerHTML = panda.parse(type, node.innerHTML);
		}
	};
	
	panda.addKeyword = function(lang, word) {
		panda[ lang ].keywords.push(word);
	};
	
	panda.addSpecial = function(lang, word) {
		panda[ lang ].specials.push(word);
	};
	
	panda.addLang = function(name, obj) {
		if('matchers' in obj && 'keywords' in obj && 'specials' in obj) {
			var n = panda[name] = {};
			n.matchers = typeof obj.matchers == 'string' ? obj.matchers.split(' ') : obj.matchers;
			n.specials = typeof obj.specials == 'string' ? obj.specials.split(' ') : obj.specials;
			n.keywords = typeof obj.keywords == 'string' ? obj.keywords.split(' ') : obj.keywords;
			
			if(obj.regex && typeof obj.regex == 'object') {
				for(var i in obj.regex) {
					panda.regex[ i ] = obj.regex[ i ];
				}
			}
		}
	};
	
	if (typeof module === 'object' && typeof module.exports === 'object') { 
		module.exports = panda; 
	}
	else {
		window.panda = panda;
	}
})();