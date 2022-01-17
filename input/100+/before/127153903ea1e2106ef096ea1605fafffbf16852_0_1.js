function commasep(row, headers, headerCount) {
  var arr = [];
  for (var i = 0; i < row.length; i++) {
    if (headerCount[headers[i]] === 1) {
      // No multiple-choice for this column
      arr.push(row[i]);
    } else {
      // There might be multiple items in this cell.
      var len;
      if (!isArray(row[i])) {
        // This row only has one answer in this column, so just push that.
        arr.push(row[i]);
        len = 1;
      } else {
        // If it's an array of responses, join them with a semicolon
        arr.push(row[i].join(";"));          
      }
      
    }
  }

  return arr.join(',');
}