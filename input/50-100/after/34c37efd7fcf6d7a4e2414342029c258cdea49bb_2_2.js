function (node) {
			ASSERT(isValid(node));

			var array = Object.keys(node.data);

			var index = array.indexOf("_mutable");
			if( index >= 0 ) {
				array.splice(index, 1);
			}

			return array;
		}