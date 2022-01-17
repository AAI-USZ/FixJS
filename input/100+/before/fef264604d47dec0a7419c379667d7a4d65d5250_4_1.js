function(e){
            if(e && e.preventDefault){
                e.preventDefault();
            }
            //console.log('paginate');

            if(this.getOperationType(e.currentTarget.className) === 'goto'){
                if(this.save.apply(this, arguments) === undefined){
                    return this.applyInterface('doSearch', this.getData());
                }
            }else{
                if(this.operate(e.currentTarget)){
                    return this.applyInterface('doSearch', this.getData());
                }
            }
        }