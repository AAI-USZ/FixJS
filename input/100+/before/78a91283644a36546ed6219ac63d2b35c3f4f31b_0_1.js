function(group, callback) {
        var hub = null;
        var img = new Image();
        
        if(typeof(group) != 'undefined') {
            if(group == 'all') {
                for(var i in this.groups) {
                    for(j=0;j<this.groups[i].length;j++) {
                        img.src = this.groups[i][j];
                    }
                }
                
                if (callback && typeof(callback) === "function") {
                    callback();
                }
                
                return true;
            } else if(typeof(this.groups[group]) == 'undefined') {
                return false;
            }
            
            hub = this.groups[group];
        } else {
            hub = this.images;
        }
            
        for(i=0;i<hub.length;i++) {
            img.src = hub[i];
        }
        
        if (callback && typeof(callback) === "function") {
            callback();
        }
        
        return true;
    }