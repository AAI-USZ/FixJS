function(fieldDfn, row) {
    if (typeof row === 'string')
      return row;
    if (fieldDfn.type === 'fixedLength' || fieldDfn.subfield === undefined)
      return row;
    var outField = {};
    var ind1 = row.ind1,
        ind2 = row.ind2;
    if (ind1 && ind1 !== " ") {
      var ind1Repr = ind1.toString();
      var ind1Val = fieldDfn.ind1[ind1Repr];
      outField[fieldDfn.ind1.id || 'ind1'] = ind1Val? ind1Val.id : ind1Repr;
    }
    if (ind2 && ind2 !== " ") {
      var ind2Repr = ind2.toString();
      var ind2Val = fieldDfn.ind2[ind2Repr];
      outField[fieldDfn.ind2.id || 'ind2'] = ind2Val? ind2Val.id : ind2Repr;
    }
    row.subfields.forEach(function (subfield) {
      for (subCode in subfield) {
        var key = subCode;
        var subDfn = fieldDfn.subfield[subCode];
        var outObj = subfield[subCode];
        if (subDfn) {
          key = dfnKey(subCode, subDfn);
        }
        if (subDfn === undefined || subDfn.repeatable !== false) {
          var outList = outField[key];
          if (outList === undefined) {
            outList = outField[key] = [];
          }
          outList.push(outObj);
          outObj = outList;
        }
        outField[key] = outObj;
      }
    });
    return outField;
  }