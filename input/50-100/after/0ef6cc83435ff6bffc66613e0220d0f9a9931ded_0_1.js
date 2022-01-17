function(title, message, options){
        this.notificationAudio.play();
        var msg = new SimpleModal(Object.merge({
            
        }, options));
        msg.show({
            title:title,
            contents: message
        });
        return this;
        //return this.notimoo.show(Object.merge({title:title || '', message:message || ''}, options));
    }