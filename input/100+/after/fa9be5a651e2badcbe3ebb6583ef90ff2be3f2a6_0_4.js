function(){
        var cluster = this.CLUSTER;

        var hosts = 0;
        if ($.isArray(cluster.HOSTS.ID))
            hosts = cluster.HOSTS.ID.length;
        else if (!$.isEmptyObject(cluster.HOSTS.ID))
            hosts = 1;

        var vnets = 0;
        if ($.isArray(cluster.VNETS.ID))
            vnets = cluster.VNETS.ID.length;
        else if (!$.isEmptyObject(cluster.VNETS.ID))
            vnets = 1;

        var dss = 0;
        if ($.isArray(cluster.DATASTORES.ID))
            dss = cluster.DATASTORES.ID.length;
        else if (!$.isEmptyObject(cluster.DATASTORES.ID))
            dss = 1;

        if (zone_id){
            array.push([
                zone_id,
                zone_name,
                cluster.ID,
                cluster.NAME,
                hosts,
                vnets,
                dss
            ]);
        } else {
            array.push([
                cluster.ID,
                cluster.NAME,
                hosts,
                vnets,
                dss
            ]);
        };

    }