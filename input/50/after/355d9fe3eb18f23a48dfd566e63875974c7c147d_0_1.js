function(arr1, arr2) { return arr1.filter(function(el) { return !arr2.contains(el); }); }