function assertDeferredByResult(deferred, result) {
        if (typeof result == 'undefined') {
            result = true;
        }
        return deferred[result ? 'resolve' : 'reject'](result);
    }