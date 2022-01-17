function(e){
            if(e && e.preventDefault){
                e.preventDefault();
            }
            //console.log('paginate');

            if(this.getOperationType(e.currentTarget.className) === 'goto'){
                if(this.save.apply(this, arguments) === undefined){
                    return this.applyInterface('doSearch', this.getData('size','number'));
                }
            }else{
                if(this.operate(e.currentTarget)){
                    var s = this.getData('size');
                    if(!s[util.getFirstPropName(s)]) this.save('size');
                    return this.applyInterface('doSearch', this.getData('size','number')); // this.getData();
                }
            }
        }