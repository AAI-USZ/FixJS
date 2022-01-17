function(topics, handler, scope, data, config) {
            if (toString.call(topics) !== '[object Array]' || !topics.length) {
                return;
            } 
            
            config = config || {};
            config.topics = {};
            config._topics = {};
            var sids = [];

            var i = 0, len = topics.length, topic;
            for (; i < len; i++) {
                topic = topics[i];
                checkPubTopic(topics[i]);
                config.topics[topic] = null;
                config._topics[topic] = false;
            }

            for (i = 0; i < len; i++) {
                sids.push(this.subscribe(topics[i], handler, scope, data, config)); 
            }
            return sids.join(';');
        }