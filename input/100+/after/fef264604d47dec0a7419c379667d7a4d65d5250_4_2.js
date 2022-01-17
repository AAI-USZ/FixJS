function(data){
            var pageEl = this.get('page');

            if(data && data.page) pageEl.set({value : data.page});

            var current = parseInt(pageEl.getProp('value').current),
                total = parseInt(pageEl.getProp('value').totalItems),
                sv = this.get('size').getProp('value'),
                pds = this.pageDefault.size,
                size = parseInt(!sv[util.getFirstPropName(sv)] ? pds[util.getFirstPropName(pds)] : sv[util.getFirstPropName(sv)]),
                m = total % size,
                pages = (total-m) / size + (m > 0 ? 1 : 0),
                sd = this.pageDefault.sizeDefault,
                half = (sd-1)/2,
                tplCfg;

            //this.save('page');
            pageEl.set({value : {totalPages : pages}});

            tplCfg = {
                size : size,
                options : [],
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

            if(util.isArray(this.pageDefault.sizeOptions)){
                for(var i = 0, op = this.pageDefault.sizeOptions; i<op.length; i++){
                    tplCfg.options.push({num : op[i], selected : size === op[i]});
                }
            }

            return tplCfg;
        }