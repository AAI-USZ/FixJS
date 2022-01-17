function(obj) {
    return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
  }