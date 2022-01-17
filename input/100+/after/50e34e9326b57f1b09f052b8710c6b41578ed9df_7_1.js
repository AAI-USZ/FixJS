function(array1, array2) {
		if ('[object Array]' != Object.prototype.toString.call(array1)
				|| '[object Array]' != Object.prototype.toString.call(array2))
			return (array1 === array2);
		else if (array1.length != array2.length)
			return false;
		else {
			for ( var i=0,n=array1.length; i<n; i++) {
				if (array1[i] != array2[i])
					return false;
			}
			return true;
		}
	}