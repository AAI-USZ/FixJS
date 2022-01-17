function recordBoundMojit(mojits, parentid, newid, type) {
        if (parentid && mojits[parentid]) {
            if (!mojits[parentid].children) {
                mojits[parentid].children = {};
            }
            mojits[parentid].children[newid] = {
                type: type,
                viewId: newid
            };
            //console.log('recorded %s child of %s', newid, parentid);
        }
    }