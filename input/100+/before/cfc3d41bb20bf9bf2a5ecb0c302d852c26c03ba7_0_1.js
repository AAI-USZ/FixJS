function( index, el ) {
			var $t = $(this),
			code = $t.html(),
			lang = $t.attr("data-lang") || $t.attr("class") || crudeHTMLcheck( code ),
			brush = nsh.getLanguage( lang ) || nsh.getLanguage( "js" ),
			highlighted = nsh.highlight( code, brush );
			$t.parent().replaceWith( highlighted );
		}