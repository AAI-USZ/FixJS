function(){
        var cluster = this.CLUSTER;

        if (zone_id){
            array.push([
                zone_id,
                zone_name,
                cluster.ID,
                cluster.NAME
            ]);
        } else {
            array.push([
                cluster.ID,
                cluster.NAME
            ]);
        };

    }