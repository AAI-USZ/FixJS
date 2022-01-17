function Testling (harness, name, conf) {
    Test.apply(this, arguments);
    for (var key in Test.prototype) {
        this[key] = Test.prototype[key].bind(this);
    }
    
    for (var key in Testling.prototype) {
        this[key] = Testling.prototype[key].bind(this);
    }
}