function(assert) {
    var doc = libxml.Document();
    var root = doc.node('root').node('child-one').parent().node('child-two');
    assert.equal('child-one', doc.child(1).name());
    assert.equal('child-two', doc.child(2).name());
    assert.done();
}