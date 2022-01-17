function() {
    this.guid = baidu.lang.guid();

    !this.__decontrolled && (baidu.$$._instances[this.guid] = this);
}