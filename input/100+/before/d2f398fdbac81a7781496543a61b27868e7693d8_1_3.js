function(assert) {
    var doc = libxml.parseXmlString(
        '<?xml version="1.0"?>' +
        '<root><child><grandchild /></child><sibling/></root>');
    assert.equal(doc, doc.child(0).doc());
    assert.equal(doc, doc.child(2).doc());
    assert.equal(doc, doc.child(0).child(1).doc());
    assert.equal(doc, doc.root().parent());

    // down and back up
    assert.equal('child', doc.child(0).child(0).parent().name());

    // propertly access inner nodes
    assert.equal('grandchild', doc.child(1).child(0).name());

    // sibling nodes
    assert.equal('sibling', doc.child(2).name());
    assert.done();
}