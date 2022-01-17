function() {
       if (rover.models)
         return rover.models[0].get('chromosome');
       else
         return 1;
       // for ( var i in this.tracks )
       //    return this.tracks[i].source.chromosome;
    }