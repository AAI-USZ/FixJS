function(name) {
        return this.repos.filter(function(r,name) {
            return (r == name);
        })
    }