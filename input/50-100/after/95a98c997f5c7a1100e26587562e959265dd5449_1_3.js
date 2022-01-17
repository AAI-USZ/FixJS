function (topics, callback) {
            if (typeof topics !== 'string') {
                if ( !callback )
                    removeListener(this, topics) // `topics` in this case being the `callback`
                else 
                    throw 'no topic specified'
            }
                    
            topics.split(' ').forEach(
                function (topic) {
                    topic = this.get(topic, false)
                    if ( topic )
                        removeListener(topic, callback)
                },
                this
            )
        }