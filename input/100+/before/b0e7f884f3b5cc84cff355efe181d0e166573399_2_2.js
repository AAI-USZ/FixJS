function(util){
    this.Paginator = new Class('Paginator', {
        pageDefault : {
            /**
             *
             size : {},
             number: {},
             page : {
                 first : 1, // optional
                 last : null, // optional
                 prev : null, // optional
                 next : null, // optional
                 totalItems : null,
                 totalPages : null, // optional
                 current : null,
                 currentArray : null // optional
             }
             */
        },
        sizeDefault : 5,
        pageTpl : '',
        typeEnum : {
            first : '\\bfirst\\b',
            last : '\\blast\\b',
            prev : '\\bprev\\b',
            next : '\\bnext\\b',
            goto : '\\bgoto\\b'
            //current : '\\bcurrent\\b'
            //number : '(\\D*)(\\d+)(\\D*)'
        },
        getOperationType : function(name){
            for(var n in this.typeEnum){
                if(new RegExp(this.typeEnum[n]).test(name)) return n;
            }
        },
        calcNumber : function(t){
            var type = this.getOperationType(t.className), c = parseInt(this.getData('page')['current']), l = parseInt(this.getData('page')['totalPages']);
            if(type === undefined){
                return /(\D*)(\d+)(\D*)/.exec(t.innerHTML) ? /(\D*)(\d+)(\D*)/.exec(t.innerHTML)[2] : undefined;
            }
            // if(type === 'first') return 1;
            if(type === 'last') return l;
            if(type === 'prev') return c - 1 > 1 ? c - 1 : 1;
            if(type === 'next') return c + 1 < l ? c + 1 : l;

            return 1;
        },
        operate : function(ct){
            var t = {}, number = this.get('number'), gotoNum = this.calcNumber(ct);
            if(number && gotoNum){
                t[util.getFirstPropName(number.getProp('value'))] = gotoNum;
                number.set({value : t});
                return true;
            }
        },
        paginate : function(e){
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
        },
        getDefault : function(){
            return this.pageDefault;
        },
        init : function(cfg){
            this.initCfg(cfg);
            this.rootNode = this.getNode('ui-paging');

            this.bindAll('changeSize', 'paginate');

            //this.render();
        },
        changeSize : function(e){
            this.save('size');
            console.log('change');
            // TODO:
            // mix this.getData() && this.pageDefault.number
            this.applyInterface('doSearch', UT.mix(this.getData(),this.pageDefault.number));
        },
        //getNode : function(rootStyle){
        //    return this._super(rootStyle, 'paginators');
        //},
        prepareTplConfig : function(data){
            var pageEl = this.get('page');

            if(data && data.page) pageEl.set({value : data.page});

            var current = parseInt(pageEl.getProp('value').current),
                total = parseInt(pageEl.getProp('value').totalItems),
                sv = this.get('size').getProp('value'),
                pds = this.pageDefault.size,
                size = parseInt(util.isEmptyObject(sv) ? pds[util.getFirstPropName(pds)] : sv[util.getFirstPropName(sv)]),
                m = total % size,
                pages = (total-m) / size + (m > 0 ? 1 : 0),
                sd = this.sizeDefault,
                half = (sd-1)/2,
                tplCfg;

            //this.save('page');
            pageEl.set({value : {totalPages : pages}});

            tplCfg = {
                totalItems : total,
                startItem : (current-1)*size+1,
                endItem : current*size>total?total:current*size,
                totalPages : pages,
                totalShow : pages > sd ? (pages-half > current?true:false) : false,
                ellipsis : pages > sd ? (pages-half-1 > current?true:false) : false,
                items : [
                    //{num:5,currentClass:false}
                ],
                current : current
            };

            for (var i = 1,l = (pages > sd ? sd : pages), h = half; i <= l; i++) {
                var num = 1;
                if(pages > sd){
                    if(current >half && current <= pages-half) num = current - h, h--;
                    if(current > pages-half) num = pages - sd + i;
                    if(current <= half) num = i;
                }else{
                    num = i;
                }

                tplCfg.items.push({num:num, currentClass:current === num ? true : false});
            }

            return tplCfg;
        },
        error :function(){
            this.show(false);
        },
        render : function(data){
            data = data.paging;

            var root = this.rootNode;

            //if(util.isEmptyObject(data)){
            //    util.addClass(root, this.hideClass);
            //}else{
                root.innerHTML = util.parseTpl(this.pageTpl, this.prepareTplConfig(data));
                this.registerEvents();
                util.removeClass(root, this.hideClass);
            //}
        }

    }).inherits(Cellula.Block);
}