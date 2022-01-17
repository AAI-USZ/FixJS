f            if(e && e.preventDefault){
                e.preventDefault();
            }
            //console.log('paginate');

            if(this.getOperationType(e.currentTarget.className) === 'goto'){
                console.log(this.save('number'));
                if(this.save.call(this, 'number') === undefined){
                //if(this.save('number')){
                    var s = this.getData('size'), size = this.get('size');
                    if(!s[util.getFirstPropName(s)])  size.set({value : this.pageDefault.size}); //this.save('size'); //
                    return this.applyInterface('doSearch', this.getData('size','number'));
                }
            }else{
                if(this.operate(e.currentTarget)){
                    var s = this.getData('size'), size = this.get('size');
                    if(!s[util.getFirstPropName(s)])  size.set({value : this.pageDefault.size}); //this.save('size'); //
                    return this.applyInterface('doSearch', this.getData('size','number')); // this.getData();
                }
            }
        },
