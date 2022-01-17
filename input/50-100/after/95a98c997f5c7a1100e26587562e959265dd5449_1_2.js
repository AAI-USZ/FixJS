function (topic, data) {
            if ( typeof topic === 'string' ) {
                // [Split test](http://jsperf.com/global-string-splitting-match-vs-regexp-vs-split)  
                topic = collect(this, topic.split('.'))
            } else {
                data = topic
                topic = this._listeners
            }
            return invokeList(topic, data)
        }