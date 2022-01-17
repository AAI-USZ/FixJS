function encodeIfComplex(query) {
    if (isComplex(query)) {
    	console.log(JSON.stringify(query));
      return encodeURI(JSON.stringify(query));
    } else if (query) {
      return $.param(query);
    }
  }