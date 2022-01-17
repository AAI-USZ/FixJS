function(key,all) {

            var keyList=[], 

                md = m.getMapData(this);



            if (!(md && md.complete)) {

                throw("Can't access data until binding complete.");

            }





            function addUniqueKeys(ad) {

                var areas,keys=[];

                if (!all) {

                    keys.push(ad.key);

                } else {

                    areas=ad.areas();

                    $.each(areas,function(i,e) {

                        keys=keys.concat(e.keys);

                    });

                }

                $.each(keys,function(i,e) {

                    if ($.inArray(e,keyList)<0) {

                        keyList.push(e);                         

                    }

                });

            }



            if (!(md  && md.complete)) {

                return '';

            }

            if (typeof key === 'string') {

                if (all) {

                    addUniqueKeys(md.getDataForKey(key));

                } else {

                    keyList=[md.getKeysForGroup(key)];

                }

            } else {

                all = key;

                this.each(function(i,e) {

                    if (e.nodeName==='AREA') {

                        addUniqueKeys(md.getDataForArea(e));

                    }

                });

            }

            return keyList.join(',');

        



        }