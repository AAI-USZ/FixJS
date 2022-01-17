function invokeList (topics, data) {
        var len = topics.length, i, listeners
        while ( len-- ) {
            listeners = topics[len]
            i = listeners.length
            if ( i > 0 ) {
                do {
                    // Returning false from a handler will prevent any further subscriptions from being notified
                    if ( listeners[--i].trigger(data) === false ) {
                        return false
                    }
                } while ( i )
            }
        }
        return true
    }