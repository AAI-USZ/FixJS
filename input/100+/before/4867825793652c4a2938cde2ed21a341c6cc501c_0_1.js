function () {
    var self = this;
    delivery_concurrency++;

    // check if there are any MXs left
    if (this.mxlist.length === 0) {
        return this.temp_fail("Tried all MXs");
    }
    
    var mx   = this.mxlist.shift();
    var host = mx.exchange;
    
    this.loginfo("Looking up A records for: " + host);

    if (net.isIP(host)) {
        self.hostlist = [ host ];
        return self.try_deliver_host(mx);
    }
    
    // now we have a host, we have to lookup the addresses for that host
    // and try each one in order they appear
    dns.resolve(host, function (err, addresses) {
        if (err) {
            self.logerror("DNS lookup of " + host + " failed: " + err);
            delivery_concurrency--;
            return self.try_deliver(); // try next MX
        }
        if (addresses.length === 0) {
            // NODATA or empty host list
            self.logerror("DNS lookup of " + host + " resulted in no data");
            delivery_concurrency--;
            return self.try_deliver(); // try next MX
        }
        self.hostlist = addresses;
        self.try_deliver_host(mx);
    });
}