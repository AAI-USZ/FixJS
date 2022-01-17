function(){
            this.model.on('change:gData', this.render, this);
            this.render();
        }