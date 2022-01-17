function vendor(el, prop) {
    var s = el[style],
        pp,
        i;

    if(s[prop] !== undefined) return prop;
    prop = prop.charAt(0).toUpperCase() + prop.slice(1);
    for(i=0; i<prefixes[length]; i++) {
      pp = prefixes[i]+prop;
      if(s[pp] !== undefined) return pp;
    }
  }