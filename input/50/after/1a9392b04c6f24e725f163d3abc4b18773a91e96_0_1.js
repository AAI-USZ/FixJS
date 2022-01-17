function(e) {
    return (e.fileName || sourceIds[e.sourceId]) + ':' + e.line + ' ' + e;
  }