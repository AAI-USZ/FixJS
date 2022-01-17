function(util){
    this.SearchingForm = new Class('SearchingForm', {
        validateAll : false,
        init : function(cfg){
            this.initCfg(cfg);
            this.bindAll('search','doSearch','dataDispatch');

            this.registerEvents();
        },
        doSearch : function(e){
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

                    postData = util.mix(this.getData(), util.isEmptyObject(size) || util.isEmptyObject(size[util.getFirstPropName(size)]) ? pageDefault.size?pageDefault.size:size:size, pageDefault.number?pageDefault.number:{});
                }else{
                    if(e){ // triggered by paginator
                        postData = util.mix({},this.getData(), e);
                    }
                }
                this.search.call(this, postData);

                // paginating
            }
        },
        search : function(data){
            //console.log('search');
            //console.log(data);
            //this.customSearch.call(this, data);
        },
        dataDispatch : function(data){  // for ajax
            /**
             * data struct
             * {
             *     dataTable:{
             *         rows : [{...},{...}...]
             *     },
             *     paging:{
             *         size:{...},
             *         number:{...},
             *         page:{...} // see paginator.pageDefault
             *     }
             * }
             */
            //TODD:
            // data validate

            // data stuct error
            if(!data.dataTable || !data.dataTable.rows || !data.paging || !data.paging.page){ //!(data.paging.size || data.paging.page || data.paging.number)
                this.applyInterface('error');
                return ;
            }

            // to table
            //this.applyInterface('DataTableAlipay.render',data.dataTable);

            // to paginator
            //this.applyInterface('PaginatorAlipay.render',data.paging);

            this.applyInterface('render', data);

        }

    }).inherits(Cellula.Block);
}