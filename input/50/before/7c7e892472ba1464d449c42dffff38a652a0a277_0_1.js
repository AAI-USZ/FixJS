function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			elem.parentNode.selectedIndex;
			
			return elem.selected === true;
		}