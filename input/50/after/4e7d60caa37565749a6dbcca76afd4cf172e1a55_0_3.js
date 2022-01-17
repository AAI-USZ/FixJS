function(k, v) {
    objc_msgSend(this.nid, "setValue:forKey:", v, k);
}