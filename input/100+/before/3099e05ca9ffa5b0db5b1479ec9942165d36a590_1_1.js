function(e){
            // TODO:
            // to deal with different framework's events handler
            var pageDefault, size, postData, isEvent = false;
            if(e && e.preventDefault){
                e.preventDefault();
                isEvent = true;
            }

            if(this.save.apply(this, isEvent?arguments:[]) === undefined){
                if(isEvent || (!isEvent && !e)){ // trigger by event // direct operation
                    pageDefault = this.applyInterface('getDefault');
                    //size = this.applyInterface('getData', 'size');
                    size = this.applyInterface('getSavedData', 'size');
                    postData = util.mix(this.getData(), util.isEmptyObject(size) || !size[util.getFirstPropName(size)] ? (pageDefault.size?pageDefault.size:size) : size, pageDefault.number?pageDefault.number:{});
                }else{
                    if(e){ // triggered by paginator
                        postData = util.mix({},this.getData(), e);
                    }
                }
                this.search.call(this, postData);

                // paginating
            }
        }