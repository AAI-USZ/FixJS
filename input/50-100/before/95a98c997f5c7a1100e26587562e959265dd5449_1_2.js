function (topic, data) {
            if ( typeof topic === 'string' ) {
                // [Split test](http://jsperf.com/global-string-splitting-match-vs-regexp-vs-split)  
                topic = SignalTree.prototype.collect.call(this, topic.split('.'))
            } else {
                data = topic
                topic = this._base._listeners
            }
            return SignalTree.prototype._emit.call(this, topic, data)
        }