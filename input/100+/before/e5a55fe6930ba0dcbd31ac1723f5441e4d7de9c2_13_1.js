function() {
		var TablePlugin = Aloha.require( 'table/table-plugin' ),		
		    jQuery = Aloha.jQuery,
		    editable = jQuery( '#editable' ),
			testcase,
			start,
			expected;
		
		for ( var i = 0; i < tests.length; i++ ) {
			testcase = tests[ i ];
			start = style_html( testcase.start );
			expected = style_html( testcase.expected );
			
			// Place test contents into our editable
			editable.html( start ).aloha();
			
			if ( typeof testcase.operation === 'function' ) {
				// Click the editable to trigger the aloha-editable-activated 
				// event Then click on the table to activate
				editable.mousedown().mouseup().find( 'table' ).mousedown();
				testcase.operation( TablePlugin.activeTable );
			}
			
			editable.mahalo();
			
			test( 'table test', { start: start, expected: expected }, function() {
				var result = editable.html().toLowerCase();
				result = result.replace( /(<table.*?)\s*id\s*=\s*[\"\'][^\"\']*[\"\']/ig, '$1' );
				result = style_html( result );
				deepEqual( result, expected, 'Check Operation Result' );
			});
		}
	}