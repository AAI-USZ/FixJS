function(f) {
    var storage = objc_msgSendSync(this.nid, "dictionary");
    for (var k in storage) {
        f(k, storage[k]);
    }
}