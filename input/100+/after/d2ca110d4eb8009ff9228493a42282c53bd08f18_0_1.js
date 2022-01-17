function(topic, msg, handlers, pubId) {
        msg = msg || null;
        var wrapFn, config;
        var checkWait = function(_topics, topics, topic, msg) {
            var r = true;
            topics[topic] = msg;
            _topics[topic] = true;
            for (var t in _topics) {
                if (!_topics[t]) {
                    r = false;
                    break;
                }
            }
            return r;
        };

        var clearWait = function(_topics, topics) {
            for (var t in _topics) {
                _topics[t] = false;
            }
        };

        for (var i = 0, len = handlers.length; i < len; i++) {
            wrapFn = handlers[i];
            if (wrapFn && (typeof pubId === 'undefined' || wrapFn.pubId !== pubId)) {
                wrapFn.pubId = pubId;
                config = wrapFn.config;
                       
                if (config && config._topics) {
                    if (checkWait(config._topics, config.topics, topic, msg)) {
                        clearWait(config._topics, config.topics);
                        wrapFn.h.call(wrapFn.scope, topic, config.topics , wrapFn.data);
                    }
                } else {
                    wrapFn.execedTime++;
                    if (toString.call(wrapFn.config.execTime) == '[object Number]'
                            && wrapFn.execedTime >= wrapFn.config.execTime) {
                        handlers.splice(i--,1);
                        len = handlers.length;
                    }
                    wrapFn.h.call(wrapFn.scope, topic, msg, wrapFn.data);
                }
            }
        }
    }