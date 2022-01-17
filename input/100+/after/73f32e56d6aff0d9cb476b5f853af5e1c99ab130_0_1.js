function(product, opt) {
    opt = $.extend({'domContext': document,
                    'navigator': navigator,
                    'data': {'categories': product.categories}},
                   opt || {});
    var self = apps,
        errSummary,
        manifestUrl = product.manifestUrl,
        $def = $.Deferred();

    /* Try and install the app. */
    if (manifestUrl && opt.navigator.mozApps && opt.navigator.mozApps.install) {
        var installRequest = opt.navigator.mozApps.install(manifestUrl, opt.data);
        installRequest.onsuccess = function() {
            $def.resolve(product);
        };
        installRequest.onerror = function() {
            // The JS shim still uses this.error instead of this.error.name.
            $def.reject(product, this.error.name || this.error);
        };
    } else {
        $def.reject();
    }
    return $def.promise();
}