function isFennec() {
    try {
      return (navigator.userAgent.indexOf('Fennec/') != -1);
    } catch(e) {};
    return false;
  }