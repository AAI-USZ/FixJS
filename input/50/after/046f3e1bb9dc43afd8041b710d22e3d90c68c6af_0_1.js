function(){
        for (var i = this.pool.length - 1; i >= 0; i--) {
            this.pool[i].close();
        }
    }