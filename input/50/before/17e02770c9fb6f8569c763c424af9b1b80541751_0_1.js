function() {
        $("#bigfish").empty();
        delete tributary.nodes;
        tributary.init(tributary.g);
        tributary.execute();
    }