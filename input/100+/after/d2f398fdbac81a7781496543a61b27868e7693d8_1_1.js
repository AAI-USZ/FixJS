function(assert) {
    var doc = libxml.Document();
    var child = doc.node('root').node('child');
    var sibling = doc.root().node('sibling');
    var gchild = child.node('grandchild');

    // access document
    assert.equal(doc, gchild.doc());
    assert.equal(doc, doc.root().parent());

    assert.equal(child, gchild.parent());
    assert.equal(gchild, doc.child(0).child(0));

    assert.equal(sibling, doc.child(1));
    assert.done();
}