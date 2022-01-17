function(assert) {
    var children = [];
    var doc = libxml.Document();
    var root = doc.node('root');
    children.push(root.node('child'));
    children.push(root.node('sibling1'));
    children.push(root.node('sibling2'));

    assert.equal(children.length, doc.childNodes().length);
    for (var i = 0; i < children.length; ++i) {
        assert.equal(children[i], doc.child(i+1));
    }
    assert.done();
}