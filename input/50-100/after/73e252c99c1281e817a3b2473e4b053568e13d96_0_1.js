function() {
        this.hash = document.location.hash;
        var hashObj = this.hashToObj();
        this.params.map(function(name) {
            hashObj[name] && (this[name] = hashObj[name]);
            /*
            if (hashObj[name]) {
                this[name] = hashObj[name];
            }
            */
        }.bind(this));
        /*
        for (var name in this.params) {
            hashObj[name] && (this[name] = hashObj[name]);
        }
        */
    }