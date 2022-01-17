function (requestId, type) { 
                    glimpse.pubsub.publish('action.data.context.reset', 'Title');
                    data.retrieve(requestId, switchContextFunc[type]);
                }