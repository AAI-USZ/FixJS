function( div ) {

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			div.innerHTML = "<select><option selected='selected'></option></select>";
			if ( !div.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push(":checked");
			}

			// assertQSAAttrEmptyValue
			// Opera 10/IE - ^= $= *= and empty values
			div.innerHTML = "<p class=''></p>";
			// Should not select anything
			if ( !!div.querySelectorAll("[class^='']").length ) {
				rbuggyQSA.push("[*^$]=[\\x20\\t\\n\\r\\f]*(?:\"\"|'')");
			}

			// assertQSAHiddenEnabled
			// IE8 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			div.innerHTML = "<input type='hidden'>";
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push(":enabled", ":disabled");
			}
		}