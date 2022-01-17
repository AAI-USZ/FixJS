function encodeIfComplex(query) {
    if (isComplex(query)) {
      return 'q=' + encodeURIComponent(JSON.stringify(query));
    } else if (query) {
      return $.param(query);
    }
  }