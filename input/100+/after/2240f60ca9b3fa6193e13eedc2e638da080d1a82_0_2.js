function(){
        var image = this.IMAGE;

        if (zone_id) {
            image_array.push([
                zone_id,
                zone_name,
                image.ID,
                image.UNAME,
                image.GNAME,
                image.NAME,
                image.DATASTORE,
                image.SIZE,
                oZones.Helper.image_type(image.TYPE),
                pretty_time(image.REGTIME),
                parseInt(image.PERSISTENT) ? "yes" : "no",
                oZones.Helper.resource_state("image",image.STATE),
                image.RUNNING_VMS,
                image.TEMPLATE.TARGET ? image.TEMPLATE.TARGET : '--'
            ]);
        } else {
            image_array.push([
                image.ID,
                image.UNAME,
                image.GNAME,
                image.NAME,
                image.DATASTORE,
                image.SIZE,
                oZones.Helper.image_type(image.TYPE),
                pretty_time(image.REGTIME),
                parseInt(image.PERSISTENT) ? "yes" : "no",
                oZones.Helper.resource_state("image",image.STATE),
                image.RUNNING_VMS,
                image.TEMPLATE.TARGET ? image.TEMPLATE.TARGET : '--'
            ]);
        };
    }