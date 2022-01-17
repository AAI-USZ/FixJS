function(topic, func, context) {
        
        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }

        var token = ( ++this.subUid ).toString();
        this.topics[topic].push({
            token: token,
            func: func,
            context: context
        });

        return token;
    }