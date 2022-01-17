function() {

        var 
            editable = Aloha.jQuery( '#edit' ),
            converter = Aloha.jQuery('<div>'),
            tests = [],
            /* 
             * Void elements http://dev.w3.org/html5/markup/spec.html#void-elements
             * 
             * area, base, br, col, command, embed, hr, img, input,
             * keygen, link, meta, param, source, track, wbr
             * 
             * - area, base,col, command, embed, keygen, link, meta, param, 
             *   source, track, wbr are not covered by tests
             * 
             */
            voidElements = [ 'hr', 'img', 'input' ],
            /*
             * All phrasing elements http://dev.w3.org/html5/markup/common-models.html#common.elem.phrasing
             * 
             * a, em, strong, small, mark, abbr, dfn, i, b, s, u, code,
             * var, samp, kbd, sup, sub, q, cite, span, bdo, bdi, br,
             * wbr, ins, del, img, embed, object, iframe, map, area,
             * script, noscript, ruby, video, audio, input, textarea,
             * select, button, label, output, datalist, keygen, progress,
             * command, canvas, time, meter
             * 
             * - br, img, embed is tested in void elements tests
             * - object, iframe, map, area, script, noscript, ruby, 
             * - video, audio, input, textarea, select, button, label, 
             *   output, datalist, keygen, progress, command, canvas, time,
             *   meter are not covered by tests
             * 
             */
            phrasingElements = [ 'a', 'em', 'strong', 'small', 'mark', 'abbr', 'dfn',
                         'i', 'b', 's', 'u', 'code', 'var', 'samp', 'kbd', 'sup',
                         'sub', 'q', 'cite', 'bdo', 'bdi', 'ins', 'del',
                         'ruby', 'time' ],
            /* 
             * All flow elements http://dev.w3.org/html5/markup/common-models.html#common.elem.flow
             * 
             * phrasing elements, a, p, hr, pre, ul, ol, dl,
             * div, h1, h2, h3, h4, h5, h6, hgroup, address, 
             * blockquote, ins, del, object, map, noscript, section,
             * nav, article, aside, header, footer, video, audio,
             * figure, table, form, fieldset, menu, canvas, details
             * 
             * - a, ins, del is tested in pharasing
             * - hr is tested in void tests
             * - ul, ol, dl are tested in list tests
             * - object, map, noscript, section, nav, article, aside, 
             *   header, footer, video, audio, figure, table, form, fieldset, 
             *   menu, canvas, details are not covered by tests
             * 
             */ 
            flowElements = [ 'pre', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                     'address', 'blockquote' ],
            flowHostElements = [ 'address', 'blockquote' ],
            newTests,
            newTest;
        
        function convertTests( replaceTag, newTag, tests ) {
            newTests = [];
            for ( var i = 0; i < tests.length; i++ ) {
                // ie hack :/
                if ( !tests[i] ) {
                    continue;
                }
                if ( jQuery.isArray ( tests[i]) ) {
                    newTest = [];
                    newTest[0] = tests[i][0].replace( replaceTag, newTag );
                    newTest[1] = tests[i][1].replace( replaceTag, newTag );
                } else {
                    newTest = tests[i].replace( replaceTag, newTag );
                }
                newTests.push( newTest );
            }
            return newTests;
        };
        
        tests = tests.concat(
        		
        	correctRangeTests,
			
			// newIETests,
        	
            // specialTests,
            
            // voidTests, // <br>
            
            // phrasingTests,
            
			// flowTests, // <p>
            
            // flowHostTests, // flow elements host
            
            // listTests,
            
            [] // I am here to prevent trailing commas and make your life easier :D
        );
        
        for ( var i = 0; i < voidElements.length; i++ ) {
            // ie hack :/
            if ( !tests[i] ) {  continue; }
			// tests = tests.concat( convertTests ( /br/g, voidElements[i], voidTests ) );
        }       
        // full phrasing tests
        for ( var i = 0; i < phrasingElements.length; i++ ) {
			// ie hack :/
			if ( !tests[i] ) {  continue; }
			// tests = tests.concat( convertTests ( /span/g, phrasingElements[i], phrasingTests ) );
        }
        for ( var i = 0; i < phrasingElements.length; i++ ) {
			// ie hack :/
			if ( !tests[i] ) {  continue; }
			// even if specified in HTML5 a cannot nest all phrasing (itself)
			if ( phrasingElements[i] == 'a' ) { continue; }
			// tests = tests.concat( convertTests ( /span/g, phrasingElements[i], nestedPhrasingTests ) );
        }
        // full flow tests
        for ( var i = 0; i < flowElements.length; i++ ) {
            // ie hack :/
            if ( !tests[i] ) {  continue; }
            //tests = tests.concat( convertTests ( /p/g, flowElements[i], flowTests ) );
        }
        // full flow host tests
        for ( var i = 0; i < flowHostElements.length; i++ ) {
            // ie hack :/
            if ( !tests[i] ) {  continue; }
            // tests = tests.concat( convertTests ( /div/g, flowHostElements[i], flowHostTests ) );
        }
        
        // aloha'fy the editable
        editable.aloha();
        
        for ( var i = tests_start; i < tests_stop && i < tests.length ; i++ ) {
            // ie hack :/
            if ( !tests[i] ) {  continue; }
            var 
                start = typeof tests[i] === 'string' ? tests[i] : tests[i][0],
                expected = typeof tests[i] === 'string' ? tests[i] : tests[i][1],
                desc = converter.text(start).html(); // + ' -> ' + converter.text(expected).html();
            
            module( 'Selection ' + (i+1) + ' : ' + desc, {
                setup: function() {
                    // fill the editable area with the start value
                    editable.html( this.start );
                    editable.focus();
                },
                teardown: function() {
                    // goodbye
                }
            });
            
            test( name, {start:start, expected:expected}, function() {
                var 
                    // place the selection (and remove the selection marker)
                    startRange = TestUtils.addRange( editable ),
                    endRange,
                    result;
                
                // remove all ranges
                Aloha.getSelection().removeAllRanges();
                
                // create a range object
                var testRange = Aloha.createRange();
                
                // set the range
                testRange.setStart( startRange.startContainer, startRange.startOffset );
                testRange.setEnd( startRange.endContainer, startRange.endOffset );
                
                // place the marker at the selection
                Aloha.getSelection().addRange( testRange );
                
                // get the selected Range
                endRange = Aloha.getSelection().getRangeAt( 0 );
                
                // add markers to selection
                TestUtils.addBrackets(endRange);
				
                // get the content of the editable
                result = Aloha.editables[ 0 ].getContents();

				// IE creates benign new lines, which cause false failures.
				// We therefore remove them for our unit tests 
				result = result.replace( /[\s\n\r]/g, '' );

                // compare the result with the expected result
                deepEqual( result.toLowerCase(), this.expected, 'Check Operation Result' );
            });
        }
    }