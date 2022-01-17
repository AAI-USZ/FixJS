function(assert) {
    var doc = libxml.parseXmlString(
        '<?xml version="1.0"?>' +
        '<root><prevSibling /><child /><nextSibling /></root>');
    var children = ['prevSibling', 'child', 'nextSibling'];

    // childNodes
    assert.equal(3, doc.childNodes().length);
    for (var i = 0; i < children.length; ++i) {
        assert.equal(children[i], doc.child(i).name());
    }

    // check prev/next sibling
    var child = doc.child(1);
    assert.equal('child', child.name());
    assert.equal(children[0], child.prevSibling().name());
    assert.equal(children[2], child.nextSibling().name());
    assert.equal(null, child.prevSibling().prevSibling());
    assert.equal(null, child.nextSibling().nextSibling());

    // prev/next Element
    var child = doc.child(1);
    assert.equal('child', child.name());
    assert.equal(children[0], child.prevElement().name());
    assert.equal(children[2], child.nextElement().name());
    assert.equal(null, child.prevElement().prevElement());
    assert.equal(null, child.nextElement().nextElement());

    assert.done();
}