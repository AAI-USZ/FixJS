function (topics, callback) {
            if (typeof topics !== 'string') {
                if ( !callback )
                    this._base.removeListener(topics)
                else 
                    throw 'no topic specified'
            }
                    
            topics.split(' ').forEach(
                function (topic) {
                    topic = this.get(topic, false)
                    if ( topic )
                        topic.remove(callback)
                },
                this
            )
        }