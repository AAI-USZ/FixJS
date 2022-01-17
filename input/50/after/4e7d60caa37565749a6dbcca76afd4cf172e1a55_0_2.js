function(k) {
    return objc_msgSendSync(this.nid, "valueForKey", k);
}