function(){
            var l = arguments.length;
            if(l === 0){
                this.save();
                return this.getData();
            }else{
                for(var i=0; i<l; i++ ){
                    this.save(arguments[i]);
                }
                return this.getData.apply(this, arguments);
            }
        }