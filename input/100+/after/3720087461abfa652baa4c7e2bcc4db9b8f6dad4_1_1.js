function(error, result) {
            for (var i = 0; i < result.length; i++) {
                var c = false;
                if (!result[i].n && !result[i].p) {
                    console.log('Ghosted tag detected');
                    console.log(result[i]);
                    continue;
                } else if(!result[i].p) {
                    result[i].p = result[i].n.replace(/-/g, ' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
                    c = true;
                } else if(!result[i].n) { //Note that this if being hit is very unlikely. Iunno what would cause it
                    c = true;               // So it's just here as 'just in case'
                    result[i].n = result[i].p.toLowerCase().replace(/[^a-z0-9-]/g, '-'); //Slug from pretty name
                }
                if (typeof(result[i].d) == 'undefined') {
                    result[i].d = '';
                    c = true;
                }
                if (typeof(result[i].m) == 'undefined') {
                    result[i].m = {};
                    c = true;
                }
                if (typeof(result[i].a) == 'undefined') {
                    result[i].a = [];
                    c = true;
                }
                if (typeof(result[i].u) == 'undefined') {
                    result[i].u = new Date();
                    c = true;
                }
                if (c) {
                    tag_collection.update({n : tag.n }, tag, true, function(error, result){
                        console.log('Recovered tag: '+tag.n);
                    });
                }
                that.list[result[i].n] = result[i];
            }
            for (var tag in that.list) {
                that.smallList.push(tag);
            }
            that.current = true;
            that.rebuild = false;
            that.rebuildExpire = Math.round((new Date()).getTime() / 1000);
            callback(error, that.list, that.smallList);
            for(var i = 0; 0 < that.gtPool.length; i++) {
                that.gtPool[i](error, that.list, that.smallList);
            }
            that.gtPool = [];
        }