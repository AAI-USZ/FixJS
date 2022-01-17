function( index, el ) {
			var $t = $(this),
			code = $t.html(),
			lang = $t.attr("data-lang") || $t.attr("class") || crudeHTMLcheck( code ),
			linenum = $t.attr("data-linenum") || 1,
			brush = nsh.getLanguage( lang ) || nsh.getLanguage( "js" ),
			highlighted = nsh.highlight( code, brush, {
				"first-line": linenum
			});
			$t.parent().replaceWith( $(highlighted).removeAttr("id") );
		}