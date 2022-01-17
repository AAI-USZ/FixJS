function(arr, type, index) {
    if (type === 'Any') return true;
    index >>>= 0;
    var len = arr.length;
    for (; index < len; index++)
      if (!this.isType(arr[index], type)) return false;
    return true;
  }