function(name){
            for(var n in this.typeEnum){
                if(new RegExp(this.typeEnum[n]).test(name)) return n;
            }
        }