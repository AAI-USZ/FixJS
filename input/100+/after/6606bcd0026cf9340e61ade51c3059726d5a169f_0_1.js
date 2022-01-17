function(test) {
    var success;
    var nodeList;
    var testNode;
    var vsrc;
    var doc;
    var docRef = null;
    if (typeof(this.doc) != 'undefined') {
      docRef = this.doc;
    }
    doc = load("img");
    nodeList = doc.getElementsByTagName("img");
    test.equal(nodeList.length, 1, 'Asize');
    testNode = nodeList.item(0);
    vsrc = testNode.src;
    test.equal(vsrc, 'file://'+__dirname+'/html/files/pix/dts.gif', 'srcLink');
    test.done();
  }