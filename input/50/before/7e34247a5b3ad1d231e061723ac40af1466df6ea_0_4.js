function() {
            var num_keys = ['expires', 'message_ttl', 'max_hops',
                            'prefetch_count', 'reconnect_delay'];
            put_parameter(this, [], num_keys);
            return false;
        }