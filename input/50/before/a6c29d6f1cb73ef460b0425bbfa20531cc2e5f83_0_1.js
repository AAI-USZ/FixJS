function(){
            this.view.remove();
            this.view = null;
            this.whiteboard = null;
            window.app.eventDispatcher.trigger('whiteboard:closed');
        }