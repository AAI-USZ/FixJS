function (directions) {
                    var topicObject = this.get(directions, true)
                    listenerData._topics.push(topicObject)
                    topicObject.add(listenerData)
                }