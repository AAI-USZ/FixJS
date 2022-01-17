function (topic) {
                    topic = this.get(topic, false)
                    if ( topic )
                        removeListener(topic, callback)
                }