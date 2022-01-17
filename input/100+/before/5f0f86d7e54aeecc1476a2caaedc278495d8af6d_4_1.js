function(data) {
            if(data.name) {
                this.name = data.name;
            }
                
            if(data.hasOwnProperty('score')) {
                this.score = data.score;
            }
            
            if(data.color) {
                this.color = data.color;
            }
            
            if(data.trail) {
                this.trail = data.trail;
            }
            
            if(data.hasOwnProperty('ready')) {
                this.ready = data.ready;
            }
                
            if(data.path) {
                this.path = data.path;
            }
        }