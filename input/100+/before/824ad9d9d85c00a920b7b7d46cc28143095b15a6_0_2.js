function() {
    var handler;
    var signal = phantom.page.javaScriptErrorSent;

    phantom.__defineSetter__('onError', function(f) {
        if (handler && typeof handler === 'function') {
            try { signal.disconnect(handler) } catch (e) {}
        }

        handler = f;

        if (typeof f === 'function') {
            signal.connect(f);
        }
    })
}