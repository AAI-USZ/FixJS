function( el ){
		var node = this, 
			prop = { };
		$.each(props,function( key,val ){
			//Makes the cross-browser
			if( key in specials )
				key = specials[key];

			//Store the origin value
			var oldvalue = "";
			//Tries find the @oldValue in @el.style propertie
			if ( node.style[key] )
				oldvalue = node.style[key];
			//If not tries find the @oldValue in computedStyle of el
			else if ( dTest.test( $(node).css(key) ) )
				oldvalue = $(node).css(key);
			//If it does not find in either the @oldValue takes value 0
			else oldvalue = "0";
			prop[ key ] = [ oldvalue,val ];
		});
		nodecss[ el ] = [ node,prop ];
	}