function(idx){

        // We try to use the cache,
        if('undefined' !== typeof this.cache[idx]){
            return this.cache[idx];
        // then we try the unparsed text.
        }else if('undefined' !== typeof this.lines[idx]){
            // Not forgetting to cache the newly parsed line.
            return (this.cache[idx] = this.parse(this.lines[idx]));
        }

        // Having failed, we realize the futility of the mission and protest in the only way we know.
        return false;
    }