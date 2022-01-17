function(guid) {
    this.guid = guid || baidu.lang.guid();
    window[baidu.guid]._instances[this.guid] = this;
}