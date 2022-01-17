f	var duplicate = duplicate || null;
	$( ".delete-swatch-a" ).show();
	if( TR.tabCount < 28 ) {
		var next_tab = TR.tabCount + 1,
			lower = TR.alpha[TR.tabCount - 1],
			upper = lower.toUpperCase();
		
		//new_style flag is only set if styles have not been added to TR.styleArray
		//or CSS yet. correctNumberOfSwatches calles addSwatch with new_style=false
		//so this block is skipped
		if( new_style ) {
			TR.undoLog.push( TR.styleBlock.text() );
			TR.redoLog = [];

			//adding swatch to CSS
			var temp_css_template = TR.graySwatch.replace( /-a,/g, "-" + lower + "," )
				.replace( /-a:/g, "-" + lower + ":" ).replace( /-a\s/g, "-" + lower + " " )
				.replace( /\{a-/g, "{" + lower + "-" ).replace( /\/\*\sA/, "/* " + upper ),
				css = TR.styleBlock.text();
			if( duplicate ) {
				//if there is a swatch to be duplicated, we use the letter passed in to do our regex patterns
				var start_reg = new RegExp( "\\/\\*\\s" + duplicate.toUpperCase() + ".*\\n-*\\*\\/" ),
					end_reg = new RegExp( "\\/\\*\\s" + TR.alpha[ TR.num[duplicate] + 1 ].toUpperCase() + ".*\\n-*\\*\\/" );
	            
	 			if( css.search( end_reg ) == -1 ) {
	                end_reg = new RegExp( "\\/\\*\\sStructure " );
	            }
				temp_css_template = css.substring( css.search( start_reg ), css.search( end_reg ) );

				var reg1 = new RegExp( "-" + duplicate + ",", "g" ),
					reg2 = new RegExp( "-" + duplicate + "\\s", "g" ),
					reg3 = new RegExp( "\\{" + duplicate + "-", "g" ),
					reg4 = new RegExp( "-" + duplicate + ":", "g" ),
					reg5 = new RegExp( "\\/\\*\\s" + duplicate.toUpperCase(), "g" );
				temp_css_template = temp_css_template.replace( reg1, "-" + lower + "," )
					.replace( reg2, "-" + lower + " " )
					.replace( reg3, "{" + lower + "-" )
					.replace( reg4, "-" + lower + ":" )
					.replace( reg5, "/* " + upper );
			}
			css = css.replace( /\/\*\sStructure\s/, temp_css_template + "\n\n/* Structure " );
			TR.styleBlock.text( css );
		}
		
		//giving the contents of the new tab
        var temp_panel_template = TR.panelTemplate.replace( /Swatch A/, "Swatch " + upper )
			.replace( /"a\-/g, "\"" + lower + "-" ).replace( /\-a"/g, "-" + lower + "\"" );
		
		$( "#tabs" ).tabs( "add", "#tab" + (TR.tabCount + 1), "+" )
            .find( "ul li a[href=#tab" + TR.tabCount + "]" ).text( upper );

		var newTabPanel = $( "#tab" + TR.tabCount );

		newTabPanel.html( temp_panel_template );
		
        //adding swatch to preview document
        var temp_swatch_template = TR.swatchTemplate.replace( /"a"/g, "\"" + lower + "\"" ).replace( />A<\/h1>/g, ">" + upper + "</h1>" )
        	.replace( /-a\s/g, "-" + lower + " " ).replace( /-a\"/g, "-" + lower + "\"" );
        $( temp_swatch_template ).insertAfter( TR.iframe.find(".swatch:last") );
		
		var iframe_window = $( "iframe" )[0].contentWindow;
        //This is a bug in JQM. Header initialization is using a live pagecreate handler on the page
        //ideally we should be able to write iframe_window.$(".swatch:last").trigger("create");
        iframe_window.$( ".ui-page" ).trigger( "pagecreate" );
        
        //adding data-form attribute to slider
		TR.addInspectorAttributes( lower );
			 
        //redefine the token array
		//not with refresh because we've only defined the CSS
		//let initStyleArray edit the styleArray
        TR.initStyleArray();

		TR.updateFormValues( newTabPanel );

        //binds all appropriate events for accordions and new tab
        TR.updateThemeRoller( TR.tabCount );
		
		//adjust the height of the add-swatch box
		var swatch_height = TR.iframe.find( ".swatch:last" ).outerHeight();
        TR.iframe.find( ".add-swatch" ).height( swatch_height );
        
		if( TR.firstAdd ) {
			//apply paging of the tabs
			$( "#tabs" ).tabs("paging", {
				cycle: true, 
				follow: true, 
				tabsPerPage: 0, 
				followOnSelect: true, 
				selectOnAdd: false
			});
        	TR.firstAdd = 0;
        }
        
        TR.refreshIframe( TR.alpha[TR.tabCount - 1] );
        TR.iframe.find( "[data-role=dialog]" ).remove();
		
        //reconfigure binding of addSwatch event
        $( "[href=#tab" + TR.tabCount + "]" ).unbind( "click", TR.addSwatchEvent );
		
        $( "[href=#tab" + next_tab + "]" ).bind( "click", TR.addSwatchEvent );

		TR.tabCount++;
	}
}
