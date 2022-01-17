function(f) {
    for (var k in this.storage) {
        f(k, this.storage[k]);
    }
}