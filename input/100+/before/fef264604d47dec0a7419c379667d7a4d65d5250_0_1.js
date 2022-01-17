function(){
            var data = {}, l = arguments.length;
            if(l === 0){
                for(var n in this.collection){
                    //data[this.collection[n].key] = this.collection[n].getValue();
                    data = util.mix(data, this.collection[n].data.value);
                }
            }else{
                for(var i=0; i<l; i++ ){
                    data = util.mix(data, this.collection[arguments[i]].data.value);
                }
            }
            return data;
        }