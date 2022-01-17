function(doc){
    var path = (doc.name || '').split(/(\.|\:)/);
    for ( var i = 1; i < path.length; i++) {
      path.splice(i, 1);
    }
    var shortName = path.pop();

    if (path.pop() == 'input') {
      shortName = 'input [' + shortName + ']';
    }

    pages.push({
      section: doc.section,
      id: doc.id,
      name: title(doc.name),
      shortName: shortName,
      type: doc.ngdoc,
      keywords:doc.keywords()
    });
  }