function(error, taglist, smallList) {
            if (smallList.indexOf(tag.n) == -1) {
                that.getCollection(function(error, tag_collection) {
                    //  -
                    tag.u = (tag.u) ? tag.u : new Date();
                    //
                    tag.m = (tag.m) ? tag.m : {};
                    tag.a = (tag.a) ? tag.a : [];
                    tag.d = (tag.d) ? tag.d : '';
                    //  Bro? :P

                    tag.c = (tag.c) ? tag.c : 0;

                    tag_collection.insert(tag, function(error, result){
                        if (result) {
                            that.current = false;
                        }
                        if (callback) callback(error, result);
                    });
                });
            } else {
                if (callback) callback(null, null);
            }
        }