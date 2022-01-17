function ieKeyFix(key) {
			// In IE7, keys may not begin with numbers.
			// See https://github.com/marcuswestin/store.js/issues/40#issuecomment-4617842
			return '_'+key
		}