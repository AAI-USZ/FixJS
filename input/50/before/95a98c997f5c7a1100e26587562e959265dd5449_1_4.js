function (topic) {
                    topic = this.get(topic, false)
                    if ( topic )
                        topic.remove(callback)
                }