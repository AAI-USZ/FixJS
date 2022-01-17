function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, array.length - n) : array[array.length - 1];
  }