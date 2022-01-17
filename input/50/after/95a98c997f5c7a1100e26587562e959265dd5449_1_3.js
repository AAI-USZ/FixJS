function (directions) {
                    var topicObject = this.get(directions, true)
                    listenerData._topics.push(topicObject)
                    insertListener(topicObject, listenerData)
                }