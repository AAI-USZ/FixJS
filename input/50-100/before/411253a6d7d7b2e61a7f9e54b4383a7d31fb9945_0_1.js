function (iName) {
    keys.push(iName);

    var iTo = aTo[iName] = {};
    var iFrom = aFrom[iName];

    var i = attrLength, name;
    while (i--) {
      name = attrKeys[i];
      if (iFrom[name] !== undefined) iTo[name] = iFrom[name];
    }
  }