function(title, message, options){
        this.notificationAudio.play();
        return this.notimoo.show(Object.merge({title:title || '', message:message || ''}, options));
    }