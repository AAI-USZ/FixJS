function() {
            var num_keys = ['expires', 'message-ttl', 'max-hops',
                            'prefetch-count', 'reconnect-delay'];
            put_parameter(this, [], num_keys);
            return false;
        }