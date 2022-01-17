function (repr, colDfn, result/*, fixprops*/) {
    var off = colDfn.offset;
    var key = repr.substring(off, off + colDfn.length) || colDfn['default'];
    var prop = colDfn.propRef;
    if (!prop) {
      if (colDfn.placeholder[0] != '<') {
        prop = colDfn.placeholder;
      } else {
        prop = "_col_" + off + "_" + colDfn.length;
      }
    }
    if (prop) {
      key = key == ' '? '_' : key;
      //var valueId = fixprops[colDfn.propRef][key].id;
      result[prop] = {code: key, getDfn: function () { return colDfn; }};
    }
  }