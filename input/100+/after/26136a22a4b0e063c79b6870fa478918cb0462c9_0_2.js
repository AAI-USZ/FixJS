function(info, rtt, protocols_whitelist) {
    var that = this;
    that._options.info = info;
    that._options.rtt = rtt;
    that._options.rto = utils.countRTO(rtt);
    that._options.info.null_origin = !_document.domain;
    var probed = utils.probeProtocols();
    that._protocols = utils.detectProtocols(probed, protocols_whitelist, info);
// <METEOR>
    // Hack to avoid XDR when using different protocols
    // We're on IE trying to do cross-protocol. jsonp only.
    if (!utils.isSameOriginScheme(that._base_url) &&
        2 === utils.isXHRCorsCapable()) {
        that._protocols = ['jsonp-polling'];
    }
// </METEOR>
}