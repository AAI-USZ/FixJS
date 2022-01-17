function(doc, p) {
    var data;
    if (p === 0 || p === '') return;
    if (typeof p === 'string') {
      doc.charLength += p.length;
      doc.totalLength += p.length;
    } else {
      doc.totalLength += p;
    }
    data = doc.data;
    if (data.length === 0) {
      data.push(p);
    } else if (typeof data[data.length - 1] === typeof p) {
      data[data.length - 1] += p;
    } else {
      data.push(p);
    }
  }